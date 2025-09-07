import { pageMeta } from "@/lib/metadata";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import type { Metadata } from "next";
import { canonical } from "@/lib/site";

const title = "Услуги — автоматизация и ИИ‑агенты";
const description = "Разрабатываю кастомные рабочие потоки на n8n, создаю ИИ‑агентов и чат‑ботов, интегрирую сервисы и настраиваю мониторинг.";
const url = canonical("/services");
const ogImage = `${canonical()}/api/og?title=${encodeURIComponent(title)}`;

export const metadata: Metadata = {
  ...pageMeta(title, "/services"),
  openGraph: { title, description, url, images: [{ url: ogImage }] },
  twitter: { card: "summary_large_image" },
};

export default function ServicesPage() {
  return (
    <Section max="narrow">
      <SectionHeader as="h1" title="Услуги" description="Разрабатываю кастомные рабочие потоки на n8n, создаю ИИ‑агентов и чат‑ботов, интегрирую ваши сервисы и настраиваю мониторинг и аналитику." />
    </Section>
  );
}
