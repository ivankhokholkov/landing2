import Link from "next/link";
import { listMdx } from "@/lib/mdx";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = { title: "Блог — статьи и гайды", alternates: { canonical: `${base}/blog` } };

export default async function BlogPage() {
  const posts = await listMdx("blog");
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Блог</h1>
      <p className="text-muted-foreground max-w-2xl">Гайды и заметки по автоматизации и n8n.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-lg border p-4 hover:bg-muted">
            <div className="font-medium">{p.frontmatter.title}</div>
            {p.frontmatter.excerpt ? (
              <div className="text-sm text-muted-foreground mt-1">{p.frontmatter.excerpt}</div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
