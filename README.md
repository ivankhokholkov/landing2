This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4 + CSS variables (light/dark)
- shadcn/ui + lucide-react
- Framer Motion
- next-themes (переключатель темы)
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

## Environment setup

Copy .env.example to .env.local and fill only what you need. Below — how to get each key.

Required for correct URLs (SEO, robots, sitemap):

- NEXT_PUBLIC_SITE_URL — e.g. https://yourdomain.com

Optional analytics/chat:

- NEXT_PUBLIC_PLAUSIBLE_DOMAIN — your Plausible domain (e.g. yourdomain.com)
- NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL — usually https://plausible.io/js/script.js
- NEXT_PUBLIC_CRISP_WEBSITE_ID — Crisp website ID (Crisp dashboard → Settings → Website Settings → Setup instructions)
- SENTRY_DSN — optional, to enable Sentry monitoring (client, server, edge)
- SENTRY_TRACES_SAMPLE_RATE — optional, default 0.1

Contact/calendar:

- NEXT_PUBLIC_CAL_LINK — public link to your calendar (Cal.com/Calendly)
- NEXT_PUBLIC_TELEGRAM_LINK — e.g. https://t.me/your_username
- NEXT_PUBLIC_WHATSAPP_NUMBER — in international format, e.g. +79991234567 (link builds wa.me)
- NEXT_PUBLIC_EMAIL — e.g. you@example.com (used for mailto)
- NEXT_PUBLIC_PHONE — e.g. +7 999 123-45-67 (used for tel:)

Courses CTA:

- NEXT_PUBLIC_COURSES_URL — external URL to your course landing

Email via Resend:

- RESEND_API_KEY — from https://resend.com (API Keys)
- LEAD_EMAIL_TO — recipient email to get notifications
- RESEND_FROM — e.g. Иван <noreply@ivan-ai-practice.ru> (use your verified domain for deliverability)

Telegram notifications:

- TELEGRAM_BOT_TOKEN — create bot with @BotFather, copy token
- TELEGRAM_CHAT_ID — numeric chat id for your group or user (add the bot to chat and use a helper bot like @getidsbot to obtain id)

Google Sheets append:

- GOOGLE_SERVICE_ACCOUNT_EMAIL — create service account in Google Cloud (IAM & Admin → Service Accounts)
- GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY — JSON key for that service account. Put in .env with \n escaped (code replaces \\n with real newlines)
- GOOGLE_SHEETS_ID — spreadsheet ID (from URL)
- GOOGLE_SHEETS_TAB_NAME — tab name (default: Leads)

Database (Postgres):

- DATABASE_URL — Postgres connection string. Use Neon, Supabase, or local Docker (see below).
  Example local: postgres://postgres:postgres@localhost:5432/landing2

### Local Postgres using Docker

- docker compose up -d db
- export DATABASE_URL=postgres://postgres:postgres@localhost:5432/landing2 (or add to .env.local)
- npm run prisma:migrate (create DB migrations for your environment)
- npm run db:studio (optional) to browse data

## Development

- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Tests

E2E tests use Playwright.

- Install browsers once: npx playwright install
- Run against dev server: npm run test:e2e
- Run against prod build: npm run build && npm run start & PW_USE_PROD=1 npm run test:e2e
- Open last HTML report: npx playwright show-report

New tests include:

- API health: GET /api/health returns ok
- API lead: invalid body → 400 with errors; valid body → 202 (with external integrations disabled by default)
- Visual/screenshots across routes and themes with artifacts attached to report

## Roadmap & audit

Подробный аудит проекта и приоритетный план улучшений:

- docs/PROJECT_AUDIT.md — критерии оценки, выводы, дорожная карта, acceptance criteria и runbook.

## CI

GitHub Actions workflow `.github/workflows/ci.yml` выполняет typecheck, build, e2e-тесты (Playwright) и Lighthouse CI на Node 20. Артефакты тестов (test-results, playwright-report) и отчёты Lighthouse загружаются как artifacts.

Security headers добавлены в next.config.mjs (X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy). CSP можно добавить позже, учитывая используемые скрипты (Plausible/Crisp), чтобы избежать блокировки.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
