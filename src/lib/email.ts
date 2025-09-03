import { Resend } from "resend";

export async function sendLeadEmail(params: {
  to: string;
  from?: string;
  subject: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true };
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: params.from || "Lead Bot <noreply@resend.dev>",
    to: [params.to],
    subject: params.subject,
    text: params.text,
  });
  if (error) throw error;
  return { data };
}
