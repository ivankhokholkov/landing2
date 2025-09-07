import { pageMeta } from "@/lib/metadata";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { ContactCtaCard } from "@/components/contact-cta-card";
import { Calendar, Mails, MessageCircle, Send, PlayCircle, Briefcase } from "lucide-react";

const title = "Контакты и заявка";
const description = "Свяжитесь удобным способом — мы ответим быстро.";
const url = canonical("/contact");
const ogImage = `${canonical()}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;

export const metadata: Metadata = {
  ...pageMeta(title, "/contact"),
  openGraph: { title, description, url, images: [{ url: ogImage }] },
  twitter: { card: "summary_large_image" },
};

export default function ContactPage() {
  const tg = process.env.NEXT_PUBLIC_TELEGRAM_LINK;
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const wa = `https://wa.me/${waNumber.replace(/[^0-9]/g, "")}`;
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const cal = process.env.NEXT_PUBLIC_CAL_LINK;
  const tgChannel = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL;
  const youtube = process.env.NEXT_PUBLIC_YOUTUBE_URL;
  const rutube = process.env.NEXT_PUBLIC_RUTUBE_URL;
  const courseUrl = process.env.NEXT_PUBLIC_COURSES_URL;

  return (
    <Section>
      <SectionHeader
        as="h1"
        title="Контакты"
        description="Пишите в Telegram или WhatsApp — отвечаю быстро. Также доступен e‑mail и календарь."
      />

      {/* Основные CTA‑карточки */}
      <div className="grid gap-3 sm:grid-cols-2">
        {tg ? (
          <ContactCtaCard
            href={tg}
            label="Telegram"
            subtitle="Самый быстрый ответ"
            icon={<Send className="h-5 w-5" />}
          />
        ) : null}
        <ContactCtaCard
          href={wa}
          label="WhatsApp"
          subtitle="Если удобнее — тоже на связи"
          icon={<MessageCircle className="h-5 w-5" />}
        />
      </div>

      {/* Другие способы */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {email ? (
          <ContactCtaCard
            href={`mailto:${email}`}
            label={`Email: ${email}`}
            subtitle="Письмо на почту"
            icon={<Mails className="h-5 w-5" />}
            external={false}
          />
        ) : null}
        {cal ? (
          <ContactCtaCard
            href={cal}
            label="Назначить созвон"
            subtitle="Выберите время"
            icon={<Calendar className="h-5 w-5" />}
          />
        ) : null}
        <ContactCtaCard
          href="/cases"
          label="Кейсы"
          subtitle="Результаты внедрений"
          icon={<Briefcase className="h-5 w-5" />}
          external={false}
        />
      </div>

      {/* Где посмотреть примеры */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Примеры и контент</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tgChannel ? (
            <ContactCtaCard
              href={tgChannel}
              label="Telegram‑канал"
              icon={<Send className="h-5 w-5" />}
            />
          ) : null}
          {youtube ? (
            <ContactCtaCard
              href={youtube}
              label="YouTube"
              icon={<PlayCircle className="h-5 w-5" />}
            />
          ) : null}
          {rutube ? (
            <ContactCtaCard
              href={rutube}
              label="RuTube"
              icon={<PlayCircle className="h-5 w-5" />}
            />
          ) : null}
          {courseUrl ? (
            <ContactCtaCard
              href={courseUrl}
              label="Stepik"
              icon={<PlayCircle className="h-5 w-5" />}
            />
          ) : null}
        </div>
      </div>
    </Section>
  );
}
