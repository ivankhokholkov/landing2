import { pageMeta } from "@/lib/metadata";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import type { Metadata } from "next";
import { canonical } from "@/lib/site";
import { ContactQuickActions } from "@/components/contact-quick-actions";

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
  return (
    <Section>
      <SectionHeader as="h1" title="Контакты" description="Выберите удобный способ связи ниже." />
      <div className="grid gap-6">
        <ContactQuickActions />
      </div>
    </Section>
  );
}
