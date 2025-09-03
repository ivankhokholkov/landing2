import { getMdxContent, listMdx } from "@/lib/mdx";

export async function generateStaticParams() {
  const cases = await listMdx("cases");
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function CasePage({ params }: { params: { slug: string } }) {
  const { content, frontmatter } = await getMdxContent("cases", params.slug);
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
      <article className="prose dark:prose-invert max-w-none">{content}</article>
    </div>
  );
}
