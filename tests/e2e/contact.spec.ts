import { test, expect } from '@playwright/test';

// Contact page: quick actions exist

test('contact page shows quick actions', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Контакты' })).toBeVisible();
  // Expect Telegram link exists (first match)
  await expect(page.getByRole('link', { name: 'Telegram' }).first()).toBeVisible();
});

