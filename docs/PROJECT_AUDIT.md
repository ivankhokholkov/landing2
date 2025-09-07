# Project audit and improvement plan

Purpose

- Make the landing fully production‑ready, easy to maintain, and optimized for conversion and SEO.
- Define clear evaluation criteria and a prioritized roadmap to reach the goals.

Current snapshot (summary)

- Tech: Next.js 14 App Router + TS, Tailwind v4, shadcn/ui.
- Content: MDX for Blog/Cases.
- Integrations: optional Resend, Prisma/Postgres, Telegram, Google Sheets.
- SEO: metadata API, robots/sitemap, dynamic OG.
- QA: ESLint + Prettier, Playwright E2E, Lighthouse CI, CI pipeline.
- Status: Build/tests pass in prod mode; contacts/CTA reworked; links/envs configured.

Evaluation criteria (0–5)

- Architecture & modularity — 4.5: clear separation (app/lib/components/content), optional integrations via env.
- Security — 4.0: CSP and headers in place; honeypot present; room for anti‑abuse/rate‑limit and attachment limits.
- Reliability & errors — 3.8: try/catch in integrations; add monitoring and stricter failures where safe.
- Performance — 4.3: static pages + fonts; minor future wins (budgets, images review, caching OG if needed).
- SEO — 4.5: good metadata, robots/sitemap/OG; ensure NEXT_PUBLIC_SITE_URL is set everywhere.
- Accessibility — 4.0: base is fine; add automated checks in CI.
- DX & tests — 4.5: lint/typecheck/E2E/LHCI; reduce dev flakiness by running E2E in prod mode (already in CI).

Key findings

- /api/lead is robust for MVP (Zod, optional integrations, honeypot) but lacks:
  - Attachment type/size validation and safe buffering.
  - Simple rate limiting.
- Email via Resend uses noreply@resend.dev — better to use a custom domain for deliverability.
- NEXT_PUBLIC_SITE_URL must be set to the deployment domain to keep canonical/robots/sitemap correct.
- Contacts page and footer now provide clear CTAs and links — good; keep copy concise and consistent.
- Dev E2E may flake due to HMR; CI uses production server — OK.

Prioritized roadmap

P0 — production hardening

1. /api/lead: attachments validation

- Accept only common doc/image types (pdf, png, jpg, jpeg, webp, txt, csv). Fail with 400 for others.
- Max per file 5 MB, total 10 MB (configurable via env: LEAD_MAX_FILE_MB, LEAD_MAX_TOTAL_MB).
- Parse multipart with size checks before buffering; avoid unbounded RAM usage.
- Tests: E2E posting oversized/invalid mime returns 400.

2. /api/lead: basic rate‑limit

- In‑memory token bucket by IP for MVP (e.g., 10 req/min); env tuned.
- Return 429 with Retry‑After.
- Tests: burst over limit returns 429.

3. Env hygiene

- Ensure NEXT_PUBLIC_SITE_URL is set in all environments; verify robots/sitemap/canonical generate correct URLs.
- README guidance for envs.

4. Email deliverability

- Configure Resend domain and from: "Иван <noreply@ivan-ai-practice.ru>" (или выделенный адрес). Заполнить RESEND_FROM.
- Шаги в Resend: Settings → Domains → Add domain → добавить DNS (TXT SPF, CNAME/Domain verification, DKIM) у провайдера. Дождаться верификации.
- Smoke test: отправка в стейджинге; проверить заголовки и что письмо не попадает в спам.

P1 — quality gates & SEO/a11y

5. A11y regression checks

- Add @axe-core/playwright checks on /, /contact, /services, /cases, /blog; fail on serious violations.

6. Lighthouse budgets/thresholds

- Define budgets: JS < 180KB, TBT < 200ms, LCP < 2.5s on desktop emulation; add to lhci config and CI gates.

7. Structured data for Courses -> Profile

- /courses now links to Stepik profile; publish JSON‑LD ProfilePage + Person instead of Course.

P2 — observability & polish

8. Monitoring (optional)

- Sentry for Next.js: error tracking и трейсинг (client/server/edge). Включается, если задан SENTRY_DSN; sample rate задаётся через SENTRY_TRACES_SAMPLE_RATE (по умолчанию 0.1).

9. CSP tightening (optional)

- Consider nonce for inline scripts if removing 'unsafe-inline' becomes feasible (Crisp).

10. Content and UX polish

- Small copy edits and icon consistency in footer; keep link order: Telegram, WhatsApp, Email.

Acceptance criteria per item (examples)

- Attachments validation
  - Invalid mime or size -> 400 with errors field; valid -> 202.
  - No file buffered beyond configured limit; memory stable under load test.

- Rate‑limit
  - 10 requests within 60s from same IP -> 429; normal traffic unaffected.

- A11y checks
  - No critical Axe violations on key routes; CI fails if regression occurs.

- LHCI
  - Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 95, SEO ≥ 95 on CI runner.

Runbook

- Dev
  ```bash path=null start=null
  npm install
  npm run dev
  ```
- Quality
  ```bash path=null start=null
  npm run lint
  npm run typecheck
  npm run build
  PW_USE_PROD=1 npm run test:e2e
  npm run lhci
  ```
- Key env (public)
  - NEXT_PUBLIC_SITE_URL (required for canonical/robots/sitemap)
  - NEXT_PUBLIC_TELEGRAM_LINK, NEXT_PUBLIC_WHATSAPP_NUMBER, NEXT_PUBLIC_EMAIL
  - NEXT_PUBLIC_TELEGRAM_CHANNEL, NEXT_PUBLIC_YOUTUBE_URL, NEXT_PUBLIC_RUTUBE_URL, NEXT_PUBLIC_COURSES_URL
- Key env (server)
  - RESEND_API_KEY, LEAD_EMAIL_TO
  - DATABASE_URL (optional)
  - TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (optional)
  - GOOGLE*SERVICE_ACCOUNT*\* + SHEETS (optional)

Open questions / decisions to capture

- What rate limit values are acceptable for prod (per‑minute/per‑day)?
- Preferred "from" address and domain for Resend?
- Monitoring stack choice (Sentry vs. alternative)?

Change log (keep updating)

- Contacts page: revamped CTA; footer updated.
- Stepik links now point to profile.
- E2E pass in prod; linters clean.
