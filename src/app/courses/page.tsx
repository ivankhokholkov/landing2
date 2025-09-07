import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/jsonld";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import type { Metadata } from "next";
import { canonical } from "@/lib/site";

const title = "Курсы по n8n";
const description = "Практические программы по n8n: от первых сценариев до продакшн‑потоков.";
const urlMeta = canonical("/courses");
const ogImage = `${canonical()}/api/og?title=${encodeURIComponent(title)}`;

export const metadata: Metadata = {
  ...pageMeta(title, "/courses"),
  openGraph: { title, description, url: urlMeta, images: [{ url: ogImage }] },
  twitter: { card: "summary_large_image" },
};

export default function CoursesPage() {
  const url = process.env.NEXT_PUBLIC_COURSES_URL;
  const jsonld = url
    ? {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url,
        mainEntity: {
          "@type": "Person",
          name: "Иван",
          url,
          sameAs: [url],
        },
      }
    : null;
  return (
    <Section>
      {jsonld ? <JsonLd data={jsonld} /> : null}
      <SectionHeader as="h1" title="Курсы" description="Практические программы по n8n: от первых сценариев до продакшн‑потоков." />
      {url ? (
        <Button asChild size="lg">
          <Link href={url} target="_blank" rel="noopener noreferrer">
            Открыть профиль Stepik
          </Link>
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          Ссылка на курсы пока не указана. Заполните NEXT_PUBLIC_COURSES_URL в .env.local
        </p>
      )}
    </Section>
  );
}
