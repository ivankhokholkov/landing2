import { test, expect, devices } from '@playwright/test';

// Capture visual screenshots of key routes on desktop and mobile

const routes = ['/', '/blog', '/cases'];

for (const route of routes) {
  test(`visual: desktop ${route}`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const outPath = testInfo.outputPath(`desktop${route.replace(/\//g, '_') || '_home'}.png`);
    await page.screenshot({ fullPage: true, path: outPath });
    testInfo.attach(`desktop${route.replace(/\//g, '_') || '_home'}`, { path: outPath, contentType: 'image/png' });
    expect(true).toBeTruthy();
  });
}

for (const route of routes) {
  test(`visual: mobile ${route}`, async ({ browser }, testInfo) => {
    const context = await browser.newContext({ ...devices['iPhone 12'] });
    const page = await context.newPage();
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const outPath = testInfo.outputPath(`mobile${route.replace(/\//g, '_') || '_home'}.png`);
    await page.screenshot({ fullPage: true, path: outPath });
    testInfo.attach(`mobile${route.replace(/\//g, '_') || '_home'}`, { path: outPath, contentType: 'image/png' });
    await context.close();
    expect(true).toBeTruthy();
  });
}

