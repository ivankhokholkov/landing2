import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export type DocFrontmatter = {
  title: string;
  date?: string;
  excerpt?: string;
  cover?: string;
};

export async function getMdxContent(dir: string, slug: string) {
  const filePath = path.join(process.cwd(), "content", dir, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { content: mdxSource, data } = matter(raw);
  const { content } = await compileMDX<{ frontmatter: DocFrontmatter }>({
    source: mdxSource,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });
  return { content, frontmatter: data as DocFrontmatter };
}

export async function listMdx(dir: string) {
  const base = path.join(process.cwd(), "content", dir);
  const files = await fs.readdir(base);
  const items: { slug: string; frontmatter: DocFrontmatter }[] = [];
  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;
    const raw = await fs.readFile(path.join(base, file), "utf8");
    const { data } = matter(raw);
    items.push({ slug: file.replace(/\.mdx$/, ""), frontmatter: data as DocFrontmatter });
  }
  // newest first by date if present
  return items.sort((a, b) => (b.frontmatter.date || "").localeCompare(a.frontmatter.date || ""));
}
