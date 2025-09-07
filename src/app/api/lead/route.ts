import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendLeadEmail } from "@/lib/email";
import { sendTelegramLead } from "@/lib/telegram";
import { appendLeadToSheet } from "@/lib/sheets";
import { sendTelegramDocuments, type TelegramFile } from "@/lib/telegram";
import { getSiteUrl } from "@/lib/site";
import { logError } from "@/lib/log";
import { fileTypeFromBuffer } from "file-type";

// Rate limiting (in-memory; MVP). Note: process lifetime scoped.
const RL_WINDOW_MS = Number.parseInt(process.env.LEAD_RATE_WINDOW_MS || "60000");
const RL_MAX = Number.parseInt(process.env.LEAD_RATE_MAX || "60");
const rl = new Map<string, { count: number; resetAt: number }>();

function rateLimitOk(ip: string) {
  const now = Date.now();
  const entry = rl.get(ip);
  if (!entry || now >= entry.resetAt) {
    rl.set(ip, { count: 1, resetAt: now + RL_WINDOW_MS });
    return { ok: true } as const;
  }
  if (entry.count >= RL_MAX) {
    return { ok: false as const, retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }
  entry.count += 1;
  rl.set(ip, entry);
  return { ok: true } as const;
}

// Attachments validation
const DEFAULT_ALLOWED_MIME = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "text/plain",
  "text/csv",
  // common office docs
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  // archives (optional, keep small)
  "application/zip",
]);
const ALLOWED_MIME = process.env.LEAD_ALLOWED_MIME
  ? new Set(process.env.LEAD_ALLOWED_MIME.split(",").map((s) => s.trim()).filter(Boolean))
  : DEFAULT_ALLOWED_MIME;
const MAX_FILE_MB = Number.parseInt(process.env.LEAD_MAX_FILE_MB || "5");
const MAX_TOTAL_MB = Number.parseInt(process.env.LEAD_MAX_TOTAL_MB || "10");
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;
const MAX_TOTAL_BYTES = MAX_TOTAL_MB * 1024 * 1024;

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  source: z.string().optional(),
  service: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Optional strict Origin/Referer check (browser requests)
    if (process.env.STRICT_ORIGIN_CHECK === "1") {
      const site = getSiteUrl();
      const origin = req.headers.get("origin") || "";
      const referer = req.headers.get("referer") || "";
      const same = (origin && origin.startsWith(site)) || (referer && referer.startsWith(site));
      if (!same) {
        return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
      }
    }

    // Basic rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rlRes = rateLimitOk(ip);
    if (!rlRes.ok) {
      return new NextResponse(JSON.stringify({ ok: false, error: "rate_limited" }), {
        status: 429,
        headers: { "Retry-After": String(rlRes.retryAfterSec) },
      });
    }

    const ctype = req.headers.get("content-type") || "";
    let name: string, email: string, message: string, source: string | undefined, service: string | undefined;
    const files: TelegramFile[] = [];

    if (ctype.includes("multipart/form-data")) {
      const form = await req.formData();
      // Honeypot
      const hp = form.get("website");
      if (typeof hp === "string" && hp.trim().length > 0) {
        return NextResponse.json({ ok: true, spam: true }, { status: 202 });
      }
      const captchaToken = String(
        form.get("captcha") || form.get("g-recaptcha-response") || form.get("h-captcha-response") || ""
      );
      const data = {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        message: String(form.get("message") || ""),
        source: form.get("source") ? String(form.get("source")) : undefined,
        service: form.get("service") ? String(form.get("service")) : undefined,
      };
      const parsed = LeadSchema.parse(data);
      name = parsed.name; email = parsed.email; message = parsed.message; source = parsed.source; service = parsed.service;

      // Optional captcha verification
      if (process.env.RECAPTCHA_SECRET || process.env.HCAPTCHA_SECRET) {
        const ok = await verifyCaptcha(captchaToken);
        if (!ok) return NextResponse.json({ ok: false, error: "captcha_failed" }, { status: 400 });
      }

      // attachments (validate type/size BEFORE buffering)
      let totalBytes = 0;
      for (const [key, value] of form.entries()) {
        if (key !== "file" && !key.startsWith("file")) continue;
        if (value instanceof File) {
          const contentType = value.type || "application/octet-stream";
          const size = typeof value.size === "number" ? value.size : 0;

          if (!ALLOWED_MIME.has(contentType)) {
            return NextResponse.json(
              { ok: false, error: "unsupported_file_type", detail: `${value.name || "file"}: ${contentType}` },
              { status: 400 }
            );
          }
          if (size > MAX_FILE_BYTES) {
            return NextResponse.json(
              { ok: false, error: "file_too_large", detail: `${value.name || "file"} > ${MAX_FILE_MB}MB` },
              { status: 400 }
            );
          }
          totalBytes += size;
          if (totalBytes > MAX_TOTAL_BYTES) {
            return NextResponse.json(
              { ok: false, error: "total_size_exceeded", detail: `total > ${MAX_TOTAL_MB}MB` },
              { status: 400 }
            );
          }
        }
      }
      // If validation passed — now buffer files and sniff real content type
      for (const [key, value] of form.entries()) {
        if (key !== "file" && !key.startsWith("file")) continue;
        if (value instanceof File) {
          const ab = await value.arrayBuffer();
          const buffer = Buffer.from(ab);
          // Sniff real MIME
          try {
            const ft = await fileTypeFromBuffer(buffer);
            if (ft?.mime && !ALLOWED_MIME.has(ft.mime)) {
              return NextResponse.json(
                { ok: false, error: "unsupported_file_type", detail: `${value.name || "file"}: ${ft.mime}` },
                { status: 400 }
              );
            }
          } catch {}
          files.push({ filename: value.name || "file", contentType: value.type || "application/octet-stream", buffer });
        }
      }
    } else {
      const json = await req.json();
      // Honeypot: if bots fill hidden field like "website", silently accept and drop
      const website = (json as Record<string, unknown>).website;
      if (typeof website === "string" && website.trim().length > 0) {
        return NextResponse.json({ ok: true, spam: true }, { status: 202 });
      }
      const captchaToken = String((json as Record<string, unknown>).captcha || "");
      // Optional captcha verification
      if (process.env.RECAPTCHA_SECRET || process.env.HCAPTCHA_SECRET) {
        const ok = await verifyCaptcha(captchaToken);
        if (!ok) return NextResponse.json({ ok: false, error: "captcha_failed" }, { status: 400 });
      }
      const parsed = LeadSchema.parse(json);
      ({ name, email, message, source, service } = parsed);
    }

    let savedId: string | undefined;
    try {
      if (process.env.DATABASE_URL) {
        const saved = await prisma.lead.create({
          data: { name, email, message, source, service },
        });
        savedId = saved.id;
      }
  } catch (e) {
      // Skip DB errors in MVP; log for debugging
      logError("DB save error", e);
    }

    try {
      if (process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO) {
        await sendLeadEmail({
          to: process.env.LEAD_EMAIL_TO,
          subject: `Новая заявка: ${name}`,
          text: `Имя: ${name}\nEmail: ${email}\nУслуга: ${service || "-"}\nИсточник: ${source || "-"}\n\n${message}`,
        });
      }
    } catch (e) {
      logError("Email send error", e);
    }

    // Telegram (optional)
    try {
      const bot = process.env.TELEGRAM_BOT_TOKEN;
      const chat = process.env.TELEGRAM_CHAT_ID;
      if (bot && chat) {
        await sendTelegramLead({ botToken: bot, chatId: chat, name, email, message, source, service });
        if (files.length) {
          await sendTelegramDocuments({ botToken: bot, chatId: chat, files, caption: undefined });
        }
      }
    } catch (e) {
      logError("Telegram send error", e);
    }

    // Google Sheets (optional)
    try {
      const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
      const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
      if (clientEmail && privateKey && spreadsheetId) {
        await appendLeadToSheet({
          clientEmail,
          privateKey,
          spreadsheetId,
          sheetName: process.env.GOOGLE_SHEETS_TAB_NAME || "Leads",
          values: [new Date().toISOString(), name, email, service || null, message, source || null],
        });
      }
    } catch (e) {
      logError("Sheets append error", e);
    }

    return NextResponse.json({ ok: true, id: savedId }, { status: 202 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten() }, { status: 400 });
    }
    logError("Lead API unhandled error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

async function verifyCaptcha(token: string): Promise<boolean> {
  if (!token) return false;
  if (process.env.RECAPTCHA_SECRET) {
    const body = new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET, response: token });
    try {
      const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        cache: 'no-store',
        signal: AbortSignal.timeout(7000),
      });
      const data = (await res.json()) as { success?: boolean };
      return !!data.success;
    } catch (e) {
      logError('reCAPTCHA verify error', e);
      return false;
    }
  }
  if (process.env.HCAPTCHA_SECRET) {
    const body = new URLSearchParams({ secret: process.env.HCAPTCHA_SECRET, response: token });
    try {
      const res = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        cache: 'no-store',
        signal: AbortSignal.timeout(7000),
      });
      const data = (await res.json()) as { success?: boolean };
      return !!data.success;
    } catch (e) {
      logError('hCaptcha verify error', e);
      return false;
    }
  }
  return true;
}
