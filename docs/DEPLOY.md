# Deployment (Vercel)

This project is prepared for automatic deployments to Vercel using GitHub Actions. You can also use the Vercel GitHub app (recommended) instead of the Action; both are fine.

## Option A — Vercel GitHub App (recommended)

1. Install the Vercel GitHub App and import the repo `ivankhokholkov/landing2`.
2. During import, Vercel will create a Project and link it to this repository.
3. Set Environment Variables in Vercel Project Settings:
   - NEXT_PUBLIC_SITE_URL=https://your-domain
   - (optional) SENTRY_DSN, SENTRY_TRACES_SAMPLE_RATE
   - (optional) RESEND*\*, TELEGRAM*_, GOOGLE\__ as needed
4. Assign your production domain in the Vercel Project → Domains.
5. Every push to main deploys to Production. PRs get Preview deployments automatically.

## Option B — GitHub Action with Vercel CLI

Secrets required in GitHub repository settings → Secrets and variables → Actions:

- VERCEL_TOKEN — personal token from https://vercel.com/account/tokens
- VERCEL_ORG_ID — Vercel Organization ID (Project → Settings → General → IDs)
- VERCEL_PROJECT_ID — Vercel Project ID (same page as above)

The workflow `.github/workflows/deploy.yml` will:

- For PRs: build and deploy a Preview
- For pushes to main: build and deploy Production

Notes:

- Node version is pinned via `package.json#engines` (Node 20), and Actions use Node 20.
- CI quality gates (build/e2e/lhci) are separate in `.github/workflows/ci.yml` and continue to run.

## Post-deploy checks

- Open the deployment URL
- Verify headers (CSP, security headers)
- Check analytics/chat if configured (Plausible/Crisp)
- Submit a lead via /contact (with integrations disabled/enabled as needed)
- Confirm robots.txt, sitemap.xml, and OG images

## Rollback

- Use Vercel UI to promote a previous deployment, or redeploy a known-good commit.
