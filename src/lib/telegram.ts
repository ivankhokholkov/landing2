export async function sendTelegramLead(params: {
  botToken: string;
  chatId: string;
  name: string;
  email: string;
  message: string;
  source?: string;
}) {
  const text = `Новая заявка\nИмя: ${params.name}\nEmail: ${params.email}\nИсточник: ${params.source || "-"}\n\n${params.message}`;
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
