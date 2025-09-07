import { test, expect } from '@playwright/test';

// API health should respond 200

test('api health returns ok', async ({ request, baseURL }) => {
  const url = new URL('/api/health', baseURL || 'http://localhost:3000').toString();
  const res = await request.get(url);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.ok).toBeTruthy();
  expect(typeof body.uptime).toBe('number');
});

