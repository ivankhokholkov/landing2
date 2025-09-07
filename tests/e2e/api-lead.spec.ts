import { test, expect } from '@playwright/test';

// API /api/lead should validate body and accept valid submissions even without external envs

test('lead API: invalid body returns 400 with errors', async ({ request, baseURL }) => {
  const url = new URL('/api/lead', baseURL || 'http://localhost:3000').toString();
  const res = await request.post(url, { data: { name: '', email: 'nope', message: '' } });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.ok).toBeFalsy();
  expect(body.errors).toBeTruthy();
});

test('lead API: valid body returns 202 Accepted (no external integrations)', async ({ request, baseURL }) => {
  const url = new URL('/api/lead', baseURL || 'http://localhost:3000').toString();
  const res = await request.post(url, {
    data: {
      name: 'Тест',
      email: 'test@example.com',
      message: 'Сообщение для теста',
      source: 'e2e',
      service: 'Разработка workflow',
    },
  });
  expect(res.status()).toBe(202);
  const body = await res.json();
  expect(body.ok).toBeTruthy();
});

