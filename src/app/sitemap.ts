import type { MetadataRoute } from "next";
import { canonical } from "@/lib/site";
import { listMdx } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/services", "/courses", "/cases", "/blog", "/about", "/contact", "/privacy", "/terms"].map((r) => ({ url: canonical(r), lastModified: new Date() }));
  const blog = await listMdx("blog");
  const cases = await listMdx("cases");
  const dynamic = [
    ...blog.map((p) => ({ url: canonical(`/blog/${p.slug}`), lastModified: new Date(p.frontmatter.date || Date.now()) })),
    ...cases.map((c) => ({ url: canonical(`/cases/${c.slug}`), lastModified: new Date(c.frontmatter.date || Date.now()) })),
  ];
  return [...staticRoutes, ...dynamic];
}
