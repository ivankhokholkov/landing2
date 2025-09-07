import { test, expect } from '@playwright/test';

// sitemap should include dynamic entries for blog and cases

test('sitemap contains dynamic blog and cases', async ({ request, baseURL }) => {
  const url = new URL('/sitemap.xml', baseURL || 'http://localhost:3000').toString();
  const res = await request.get(url);
  expect(res.status()).toBe(200);
  const xml = await res.text();
  expect(xml).toContain('/blog/first-post');
  expect(xml).toContain('/cases/first-case');
});

