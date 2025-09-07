import { pageMeta } from "@/lib/metadata";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import type { Metadata } from "next";
import { canonical } from "@/lib/site";

const title = "Пользовательское соглашение";
const description = "Условия использования сервиса и юридическая информация.";
const url = canonical("/terms");
const ogImage = `${canonical()}/api/og?title=${encodeURIComponent(title)}`;

export const metadata: Metadata = {
  ...pageMeta(title, "/terms"),
  openGraph: { title, description, url, images: [{ url: ogImage }] },
  twitter: { card: "summary_large_image" },
};

export default function TermsPage() {
  return (
    <Section max="narrow">
      <SectionHeader as="h1" title="Пользовательское соглашение" description="Здесь будут условия использования сервиса." />
    </Section>
  );
}
