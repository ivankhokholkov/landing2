"use client";

import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    { href: tg, label: "Telegram", icon: <Send className="h-6 w-6" /> },
    { href: wa, label: "WhatsApp", icon: <MessageCircle className="h-6 w-6" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {primary.map((i) => (
        <Button
          asChild
          key={i.label}
          variant="outline"
          size="lg"
          className="h-14 rounded-xl justify-start px-5 text-base"
        >
          <Link
            href={i.href}
            target={i.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            <span className="inline-flex items-center gap-3">
              {i.icon}
              <span>{i.label}</span>
            </span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
