import { test, expect } from '@playwright/test';

// Honeypot should be accepted (202) and marked spam

test('lead API honeypot: website field is treated as spam', async ({ request, baseURL }) => {
  const url = new URL('/api/lead', baseURL || 'http://localhost:3000').toString();
  const res = await request.post(url, {
    data: {
      name: 'Спам Бот',
      email: 'bot@example.com',
      message: 'Спам сообщение',
      website: 'http://spam.example.com',
    },
  });
  expect(res.status()).toBe(202);
  const body = await res.json();
  expect(body.ok).toBeTruthy();
  expect(body.spam).toBeTruthy();
});

