import { pageMeta } from "@/lib/metadata";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import type { Metadata } from "next";
import { canonical } from "@/lib/site";

const title = "Политика конфиденциальности";
const description = "Правовая информация и политика конфиденциальности проекта.";
const url = canonical("/privacy");
const ogImage = `${canonical()}/api/og?title=${encodeURIComponent(title)}`;

export const metadata: Metadata = {
  ...pageMeta(title, "/privacy"),
  openGraph: { title, description, url, images: [{ url: ogImage }] },
  twitter: { card: "summary_large_image" },
};

export default function PrivacyPage() {
  return (
    <Section max="narrow">
      <SectionHeader as="h1" title="Политика конфиденциальности" description="Здесь будет текст политики конфиденциальности." />
    </Section>
  );
}
