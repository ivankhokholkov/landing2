import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendLeadEmail } from "@/lib/email";
import { sendTelegramLead } from "@/lib/telegram";
import { appendLeadToSheet } from "@/lib/sheets";
import { sendTelegramDocuments, type TelegramFile } from "@/lib/telegram";

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  source: z.string().optional(),
  service: z.string().optional(),
});

export async function POST(req: Request) {
  try {
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
      const data = {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        message: String(form.get("message") || ""),
        source: form.get("source") ? String(form.get("source")) : undefined,
        service: form.get("service") ? String(form.get("service")) : undefined,
      };
      const parsed = LeadSchema.parse(data);
      name = parsed.name; email = parsed.email; message = parsed.message; source = parsed.source; service = parsed.service;
      // attachments
      for (const [key, value] of form.entries()) {
        if (key !== "file" && !key.startsWith("file")) continue;
        if (value instanceof File) {
          const ab = await value.arrayBuffer();
          files.push({ filename: value.name || "file", contentType: value.type || "application/octet-stream", buffer: Buffer.from(ab) });
        }
      }
    } else {
      const json = await req.json();
      // Honeypot: if bots fill hidden field like "website", silently accept and drop
      const website = (json as Record<string, unknown>).website;
      if (typeof website === "string" && website.trim().length > 0) {
        return NextResponse.json({ ok: true, spam: true }, { status: 202 });
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
      console.error("DB save error", e);
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
      console.error("Email send error", e);
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
      console.error("Telegram send error", e);
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
      console.error("Sheets append error", e);
    }

    return NextResponse.json({ ok: true, id: savedId }, { status: 202 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.flatten() }, { status: 400 });
    }
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
