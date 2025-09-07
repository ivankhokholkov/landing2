import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/contact', '/services', '/cases', '/blog'];

function describeRoute(route: string) {
  test(`a11y: no serious violations on ${route}`, async ({ page }, testInfo) => {
    test.setTimeout(60_000);
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    // Stabilize fonts/animations for deterministic results
    try { await page.waitForFunction(() => ( (document as unknown as { fonts?: { status?: string } }).fonts?.status === 'loaded' ), { timeout: 3000 }); } catch {}
    await page.addStyleTag({ content: '* { transition: none !important; animation: none !important; }' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Attach raw report for debugging
    const report = JSON.stringify(results, null, 2);
    await testInfo.attach(`axe-${route.replace(/\//g, '_')}.json`, { body: report, contentType: 'application/json' });

    const critical = results.violations.filter(v => v.impact === 'critical');
    if (critical.length) {
      const ids = critical.map(v => v.id).join(', ');
      console.warn('A11y critical violations on', route, ids);
    }
    expect(critical, `Critical a11y violations on ${route}: ${critical.map(v => v.id).join(', ')}`).toEqual([]);
  });
}

for (const route of routes) describeRoute(route);

