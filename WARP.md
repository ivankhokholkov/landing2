# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project summary

- Framework: Next.js 14 (App Router) + TypeScript
- Styling: Tailwind CSS v4, shadcn/ui
- Content: MDX files under content/
- Backend (optional): Prisma + Postgres for leads; email via Resend; Telegram and Google Sheets integrations (all optional via env)
- Lint/format: ESLint (Next core-web-vitals), Prettier; Husky + lint-staged on commit

Common commands

Use npm (package-lock.json is present).

- Install deps (also runs prisma generate via postinstall):
  - npm install
- Dev server:
  - npm run dev
- Production build:
  - npm run build
- Start production server (after build):
  - npm run start
- Lint:
  - npm run lint
- Type check:
  - npm run typecheck

Notes

- E2E tests (Playwright) and Lighthouse CI are configured. CI runs typecheck, build, e2e tests, and Lighthouse CI.
- Pre-commit runs lint-staged: ESLint --fix on TS/JS and Prettier on md/json/yml/yaml/css.

Environment configuration

Create .env.local with values used throughout the app. Only set what you need; integrations are optional and guarded in code.

Public (runtime-exposed)

- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_PLAUSIBLE_DOMAIN (if using Plausible)
- NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL (optional override)
- NEXT_PUBLIC_CRISP_WEBSITE_ID (if using Crisp)
- NEXT_PUBLIC_CAL_LINK (contact page calendar embed)
- NEXT_PUBLIC_TELEGRAM_LINK (contact shortcut)
- NEXT_PUBLIC_WHATSAPP_NUMBER (contact shortcut, intl format like +79991234567)
- NEXT_PUBLIC_EMAIL (for mailto in quick actions)
- NEXT_PUBLIC_PHONE (for tel: link)
- NEXT_PUBLIC_COURSES_URL (courses CTA link)

Server-only

- DATABASE_URL (Postgres; enables Prisma Lead persistence)
- RESEND_API_KEY (enables email sending)
- LEAD_EMAIL_TO (recipient for lead notifications)
- TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (enable Telegram lead notifications)
- GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_SHEETS_ID, GOOGLE_SHEETS_TAB_NAME (optional; append leads to Google Sheets)
  - Private key should keep newlines escaped (\n). Code converts \\n to real newlines.

High-level architecture

- App Router (src/app)
  - layout.tsx sets global fonts, ThemeProvider, header/footer, Vercel Analytics, optional Plausible and Crisp scripts. Uses Next metadata for basic SEO.
  - page.tsx renders the landing page sections with shadcn/ui components and framer-motion animations.
  - Static pages for about, services, courses, privacy, terms.
  - SEO helpers: robots.ts and sitemap.ts use NEXT_PUBLIC_SITE_URL to generate correct URLs.

- Content system (content/, src/lib/mdx.ts)
  - Blog and case studies are MDX files under content/blog and content/cases with frontmatter parsed by gray-matter.
  - src/lib/mdx.ts compiles MDX server-side using next-mdx-remote/rsc, with remark-gfm and rehype-slug.
  - Routes: /blog and /cases list entries; [slug] routes statically enumerate via generateStaticParams and render compiled MDX.

- API routes (src/app/api)
  - /api/lead (route.ts)
    - Validates body with zod.
    - If DATABASE_URL is set, saves Lead via Prisma (prisma.lead.create).
    - If RESEND_API_KEY and LEAD_EMAIL_TO set, sends email via Resend.
    - If TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID set, posts to Telegram.
    - If Google Sheets envs set, appends a row using googleapis with JWT auth; replaces \\n with real newlines for the private key.
    - Responds 202 with optional saved id; Zod errors return 400.
  - /api/og (route.tsx)
    - Edge runtime via @vercel/og. Generates dynamic OG images using title/subtitle query params.

- Data layer (prisma/ and src/lib)
  - prisma/schema.prisma defines a minimal Lead model. prisma generate runs on postinstall; PrismaClient is singletoned in src/lib/prisma.ts.
  - Integrations in src/lib: email.ts (Resend), telegram.ts (Telegram Bot API), sheets.ts (Google Sheets append).

- UI and theming
  - shadcn/ui components under src/components/ui; theme toggle/provider via next-themes.
  - Header/navigation in src/components/header.tsx; global styles in src/app/globals.css (Tailwind v4 via @tailwindcss/postcss plugin).

- SEO configuration
  - The app uses the App Router metadata API in layout and pages, plus a dynamic OG endpoint at /api/og.

- Conventions and tooling
  - Path alias @/_ maps to src/_ (see tsconfig.json).
  - ESLint uses flat config extending next/core-web-vitals + next/typescript; ignores .next, build outputs, node_modules.
  - Prettier configured (singleQuote, semi, printWidth=100, trailingComma=es5). .prettierignore excludes typical build dirs.

CI

GitHub Actions workflow (.github/workflows/ci.yml):

- Node 20, npm cache
- npm ci
- npm run typecheck
- npm run build
- npx playwright install --with-deps
- npm run test:e2e
- npm run lhci

Key files and directories

- src/app/layout.tsx — global layout, metadata, analytics, theme, header/footer
- src/app/page.tsx — landing page
- src/app/api/lead/route.ts — lead intake pipeline (DB, email, Telegram, Sheets are optional)
- src/lib/{prisma,email,telegram,sheets}.ts — integrations and data access
- content/blog, content/cases — MDX content sources
- prisma/schema.prisma — Prisma schema
- src/app/{robots.ts,sitemap.ts} — SEO artifacts
- tests/e2e — Playwright E2E tests

Tips for future edits (project-specific)

- If you enable DATABASE_URL, ensure the Postgres schema is migrated appropriately before expecting writes in /api/lead. prisma generate is handled automatically on install; migration commands are not defined as scripts here.
- When setting Google service account envs, keep the private key in a single-line .env entry with \n escapes; the code will convert it.
- Set NEXT_PUBLIC_SITE_URL to ensure canonical URLs, robots, and sitemap reflect your deployment domain.
