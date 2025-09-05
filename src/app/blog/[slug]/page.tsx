import { getMdxContent, listMdx } from "@/lib/mdx";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { canonical } from "@/lib/site";
import { Section } from "@/components/section";

export async function generateStaticParams() {
  const posts = await listMdx("blog");
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { frontmatter } = await getMdxContent("blog", params.slug);
  const url = canonical(`/blog/${params.slug}`);
  const base = canonical();
  const cover = typeof frontmatter.cover === 'string' && frontmatter.cover.length > 0
    ? (frontmatter.cover.startsWith('http') ? frontmatter.cover : `${base}${frontmatter.cover.startsWith('/') ? frontmatter.cover : `/${frontmatter.cover}`}`)
    : undefined;
  const fallbackOg = `${base}/api/og?title=${encodeURIComponent(frontmatter.title)}${frontmatter.excerpt ? `&subtitle=${encodeURIComponent(frontmatter.excerpt)}` : ""}`;
  const ogImage = cover || fallbackOg;
  return {
    ...pageMeta(frontmatter.title, `/blog/${params.slug}`),
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      url,
      images: [{ url: ogImage }],
      type: "article",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { content, frontmatter } = await getMdxContent("blog", params.slug);
  return (
    <Section max="narrow">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
        <article className="prose dark:prose-invert max-w-none">{content}</article>
      </div>
    </Section>
  );
}
