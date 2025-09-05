import { test, expect } from '@playwright/test';

// Verify SEO endpoints and OG image endpoint

test('robots.txt and sitemap.xml are reachable', async ({ request }) => {
  const robots = await request.get('http://localhost:3000/robots.txt');
  expect(robots.status()).toBe(200);
  const sitemap = await request.get('http://localhost:3000/sitemap.xml');
  expect(sitemap.status()).toBe(200);
});

test('og endpoint returns image', async ({ request }) => {
  const res = await request.get('http://localhost:3000/api/og?title=Test');
  expect(res.status()).toBe(200);
  const ctype = res.headers()['content-type'] || '';
  expect(ctype).toContain('image');
});

