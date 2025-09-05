export async function sendTelegramLead(params: {
  botToken: string;
  chatId: string;
  name: string;
  email: string;
  message: string;
  source?: string;
  service?: string;
}) {
  const text = `Новая заявка\nИмя: ${params.name}\nEmail: ${params.email}\nУслуга: ${params.service || "-"}\nИсточник: ${params.source || "-"}\n\n${params.message}`;
  const url = `https://api.telegram.org/bot${params.botToken}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: params.chatId, text }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Telegram sendMessage failed: ${res.status}`);
  }
  return res.json();
}

export type TelegramFile = {
  filename: string;
  contentType: string;
  buffer: Buffer;
};

export async function sendTelegramDocuments(params: {
  botToken: string;
  chatId: string;
  files: TelegramFile[];
  caption?: string;
}) {
  for (const file of params.files) {
    const form = new FormData();
    form.append("chat_id", params.chatId);
    if (params.caption) form.append("caption", params.caption);
    // Convert Node Buffer -> Uint8Array for Blob
    const u8 = new Uint8Array(file.buffer);
    const blob = new Blob([u8], { type: file.contentType });
    form.append("document", blob, file.filename);
    const url = `https://api.telegram.org/bot${params.botToken}/sendDocument`;
    const res = await fetch(url, { method: "POST", body: form, cache: "no-store" });
    if (!res.ok) throw new Error(`Telegram sendDocument failed: ${res.status}`);
  }
}
