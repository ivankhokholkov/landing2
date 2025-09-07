import { test, expect } from '@playwright/test';

test.describe('Contact form (UI)', () => {
  test('submit lead via form (desktop only)', async ({ page }, testInfo) => {
    // Run only on desktop project to avoid exceeding rate-limit with duplicates
    if ((testInfo.project as { name: string }).name !== 'desktop') test.skip();

    await page.goto('/contact', { waitUntil: 'domcontentloaded' });

    await page.getByLabel('Имя').fill('Тест Пользователь');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Сообщение').fill('Проверка отправки формы через UI тест.');
    await page.getByRole('button', { name: 'Отправить заявку' }).click();

    // Expect success toast/text
    await expect(page.getByText('Заявка отправлена!')).toBeVisible();
  });
});
