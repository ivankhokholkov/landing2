import { pageMeta } from "@/lib/metadata";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import type { Metadata } from "next";
import { canonical } from "@/lib/site";

const title = "Обо мне — Иван";
const description = "Привет! Я Иван. Помогаю бизнесу внедрять n8n и ИИ‑агентов, чтобы ускорять процессы и расти без лишней рутины.";
const url = canonical("/about");
const ogImage = `${canonical()}/api/og?title=${encodeURIComponent(title)}`;

export const metadata: Metadata = {
  ...pageMeta(title, "/about"),
  openGraph: { title, description, url, images: [{ url: ogImage }] },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return (
    <Section max="narrow">
      <SectionHeader as="h1" title="Обо мне" description="Привет! Я Иван. Помогаю бизнесу внедрять n8n и ИИ‑агентов, чтобы ускорять процессы и расти без лишней рутины. Провожу обучение и делюсь практикой на курсах." />
    </Section>
  );
}
