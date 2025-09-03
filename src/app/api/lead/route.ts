import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendLeadEmail } from "@/lib/email";
import { sendTelegramLead } from "@/lib/telegram";
import { appendLeadToSheet } from "@/lib/sheets";

const LeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { name, email, message, source } = LeadSchema.parse(json);

    let savedId: string | undefined;
    try {
      if (process.env.DATABASE_URL) {
        const saved = await prisma.lead.create({
          data: { name, email, message, source },
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
          text: `Имя: ${name}\nEmail: ${email}\nИсточник: ${source || "-"}\n\n${message}`,
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
        await sendTelegramLead({
          botToken: bot,
          chatId: chat,
          name,
          email,
          message,
          source,
        });
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
          values: [new Date().toISOString(), name, email, message, source || null],
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
