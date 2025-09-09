"use client";

import { MessageCircle, Send } from "lucide-react";
import { ContactCtaCard } from "@/components/contact-cta-card";

function actionLink() {
  const tg = process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/your_username";
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+79991234567"; // fallback example
  const email = process.env.NEXT_PUBLIC_EMAIL || null;
  const cal = process.env.NEXT_PUBLIC_CAL_LINK || null;
  const phone = process.env.NEXT_PUBLIC_PHONE || null;
  const wa = `https://wa.me/${waNumber.replace(/[^0-9]/g, "")}`;
  const mailto = email ? `mailto:${email}?subject=${encodeURIComponent("Запрос с сайта")}&body=${encodeURIComponent("Здравствуйте! Хочу обсудить проект.")}` : null;
  const tel = phone ? `tel:${phone.replace(/\s/g, "")}` : null;
  return { tg, wa, mailto, cal, tel };
}

export function ContactQuickActions() {
  const { tg, wa } = actionLink();
  const primary = [
    { href: tg, label: "Telegram", icon: <Send className="h-5 w-5" /> },
    { href: wa, label: "WhatsApp", icon: <MessageCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {primary.map((i) => (
        <ContactCtaCard
          key={i.label}
          href={i.href}
          label={i.label}
          icon={i.icon}
        />
      ))}
    </div>
  );
}
