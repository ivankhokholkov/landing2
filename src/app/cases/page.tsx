import Link from "next/link";
import { listMdx } from "@/lib/mdx";
import { pageMeta } from "@/lib/metadata";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";
import { canonical } from "@/lib/site";

const title = "Кейсы — результаты проектов";
const description = "Реальные примеры автоматизаций и результаты.";
const url = canonical("/cases");
const ogImage = `${canonical()}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;

export const metadata: Metadata = {
  ...pageMeta(title, "/cases"),
  openGraph: { title, description, url, images: [{ url: ogImage }] },
  twitter: { card: "summary_large_image" },
};

export default async function CasesPage() {
  const cases = await listMdx("cases");
  return (
    <Section>
      <SectionHeader as="h1" title="Кейсы" description="Реальные примеры автоматизаций и результаты." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <Link href={`/cases/${c.slug}`} className="group">
              <Card className="h-full hover:bg-muted transition-colors">
                <CardHeader>
                  <div className="font-medium">{c.frontmatter.title}</div>
                </CardHeader>
                {c.frontmatter.excerpt ? (
                  <CardContent>
<div className="text-[15px] text-muted-foreground">{c.frontmatter.excerpt}</div>
                  </CardContent>
                ) : null}
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
