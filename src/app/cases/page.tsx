import Link from "next/link";
import { listMdx } from "@/lib/mdx";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = { title: "Кейсы — результаты проектов", alternates: { canonical: `${base}/cases` } };

export default async function CasesPage() {
  const cases = await listMdx("cases");
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Кейсы</h1>
      <p className="text-muted-foreground max-w-2xl">Реальные примеры автоматизаций и результаты.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className="rounded-lg border p-4 hover:bg-muted">
            <div className="font-medium">{c.frontmatter.title}</div>
            {c.frontmatter.excerpt ? (
              <div className="text-sm text-muted-foreground mt-1">{c.frontmatter.excerpt}</div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
