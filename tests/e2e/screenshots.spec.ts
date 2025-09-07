import { test } from '@playwright/test';
// Note: write screenshots to Playwright's test-results directory to avoid triggering Next.js dev reloads

const routes = [
  '/',
  '/services',
  '/courses',
  '/cases',
  '/cases/first-case',
  '/blog',
  '/blog/first-post',
  '/contact',
  '/about',
  '/privacy',
  '/terms',
];

const themes: Array<'light' | 'dark'> = ['light', 'dark'];

function slugify(route: string) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
}

test.describe('Screenshots', () => {
  test('capture full-page screenshots on multiple routes and themes', async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    // Reduce flakiness: disable animations and use reduced motion
    await page.addStyleTag({ content: `* { transition: none !important; }
      html:has(body) { scroll-behavior: auto !important; }
      @media (prefers-reduced-motion: no-preference) {
        *, *::before, *::after { animation: none !important; }
      }
    `});

    for (const theme of themes) {
      // Ensure theme is set before any scripts run
      await page.addInitScript((t) => {
        try { localStorage.setItem('theme', t); } catch {}
      }, theme);

      for (const route of routes) {
        const baseURL = ((testInfo.project as { use?: { baseURL?: string } }).use?.baseURL) || 'http://localhost:3000';
        const url = new URL(route, baseURL).toString();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        // Stabilize layout without waiting for potentially long-lived connections (iframes, analytics)
        try { await page.waitForFunction(() => ( (document as unknown as { fonts?: { status?: string } }).fonts?.status === 'loaded' ), { timeout: 5000 }); } catch {}
        try { await page.waitForLoadState('load', { timeout: 10000 }); } catch {}
        await page.waitForTimeout(300);

        // Output path (within Playwright's test-results to avoid dev server reloads)
        const outPath = testInfo.outputPath(`${testInfo.project.name}-${theme}-${slugify(route)}.png`);
        await page.screenshot({ path: outPath, fullPage: true });
        testInfo.attach(`${testInfo.project.name}-${theme}-${slugify(route)}`, { path: outPath, contentType: 'image/png' });
      }
    }

  });
});

