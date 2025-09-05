import { test, expect } from '@playwright/test';

// Blog and cases lists and details

test('blog list and open first post', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.getByRole('heading', { name: 'Блог' })).toBeVisible();
  const links = page.locator('a[href^="/blog/"]');
  await expect(links.first()).toBeVisible();
  const firstHref = await links.first().getAttribute('href');
  if (!firstHref) throw new Error('No blog post link found');
  await links.first().click();
  await expect(page).toHaveURL(new RegExp(firstHref.replace('/', '\\/') + '$'), { timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('cases list and open first case', async ({ page }) => {
  await page.goto('/cases');
  await expect(page.getByRole('heading', { name: 'Кейсы' })).toBeVisible();
  const links = page.locator('a[href^="/cases/"]');
  await expect(links.first()).toBeVisible();
  const firstHref = await links.first().getAttribute('href');
  if (!firstHref) throw new Error('No case link found');
  await links.first().click();
  await expect(page).toHaveURL(new RegExp(firstHref.replace('/', '\\/') + '$'), { timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

