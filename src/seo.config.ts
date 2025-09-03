import type { DefaultSeoProps } from "next-seo";

export const SEO: DefaultSeoProps = {
  titleTemplate: "%s | Иван — Автоматизация и Курсы n8n",
  defaultTitle: "Иван — Автоматизация и Курсы n8n",
  description:
    "Автоматизация процессов и ИИ‑агенты на n8n. Курсы, консалтинг, внедрение и поддержка.",
  canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    siteName: "Иван — Автоматизация и Курсы n8n",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};
