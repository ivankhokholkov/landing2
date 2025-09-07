import Link from "next/link";
import { listMdx } from "@/lib/mdx";
import { pageMeta } from "@/lib/metadata";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import type { Metadata } from "next";
import { canonical } from "@/lib/site";

const title = "Блог — статьи и гайды";
const description = "Гайды и заметки по автоматизации и n8n.";
const url = canonical("/blog");
const ogImage = `${canonical()}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;

export const metadata: Metadata = {
  ...pageMeta(title, "/blog"),
  openGraph: { title, description, url, images: [{ url: ogImage }] },
  twitter: { card: "summary_large_image" },
};

export default async function BlogPage() {
  const posts = await listMdx("blog");
  return (
    <Section>
      <SectionHeader as="h1" title="Блог" description="Гайды и заметки по автоматизации и n8n." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link href={`/blog/${p.slug}`} className="group">
              <Card className="h-full hover:bg-muted transition-colors">
                <CardHeader>
                  <div className="font-medium text-foreground">{p.frontmatter.title}</div>
                </CardHeader>
                {p.frontmatter.excerpt ? (
                  <CardContent>
<div className="text-[15px] text-muted-foreground">{p.frontmatter.excerpt}</div>
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
