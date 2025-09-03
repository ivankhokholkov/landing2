This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4 + CSS variables (light/dark)
- shadcn/ui + lucide-react
- Framer Motion, Lottie (готово к добавлению)
- next-themes (переключатель темы)
- next-intl (готовим i18n RU/EN)
- next-seo (используем частично; в App Router базовое SEO через metadata)
- @vercel/og (динамические OG)
- Prisma + Postgres (Lead модель), Resend (email)
- Vercel Analytics + Plausible (через Script)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Copy .env.example to .env.local and fill:

- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_PLAUSIBLE_DOMAIN (если используете Plausible)
- NEXT_PUBLIC_CRISP_WEBSITE_ID (если используете Crisp)
- NEXT_PUBLIC_CAL_LINK (ссылка на ваш Cal.com/Calendly)
- RESEND_API_KEY, LEAD_EMAIL_TO (для отправки писем)
- DATABASE_URL (Postgres Neon/Supabase)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Inter/JetBrains Mono.

## Development

- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## CI

GitHub Actions workflow `.github/workflows/ci.yml` выполняет typecheck и build на Node 20.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
