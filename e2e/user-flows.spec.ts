import { expect, test, Page } from '@playwright/test';

async function loginViaUi(page: Page, email: string) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.locator('.login-form').getByRole('button', { name: 'Login' }).click();
}

async function authAs(page: Page, email: string) {
  await page.goto('/');
  await page.waitForSelector('app-header');
  await page.evaluate((userEmail) => {
    const headerEl = document.querySelector('app-header');
    const ng = (window as any).ng;
    const header = ng?.getComponent?.(headerEl);
    header?.userService?.login(userEmail);
  }, email);
}

test.describe('Пользовательские e2e-сценарии', () => {
  test('гость может открыть каталог и перейти на логин из хедера', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Course catalog' })).toBeVisible();

    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('гость перенаправляется на логин с защищенных роутов', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/login$/);

    await page.goto('/course/1/1');
    await expect(page).toHaveURL(/\/login$/);

    await page.goto('/create-course');
    await expect(page).toHaveURL(/\/login$/);
  });

  test('логин показывает ошибку для неизвестного пользователя', async ({ page }) => {
    await loginViaUi(page, 'unknown@example.com');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText('Error: LOGIN.ERROR_USER_NOT_FOUND')).toBeVisible();
  });

  test('студент может войти, открыть профиль и выйти', async ({ page }) => {
    await loginViaUi(page, 'ivan@example.com');
    await expect(page).toHaveURL(/\/$/);

    await page.getByRole('button', { name: 'Profile' }).click();
    await expect(page).toHaveURL(/\/profile$/);
    await expect(page.getByText('ivan@example.com')).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('студент может открыть детали курса и переходить между уроками', async ({ page }) => {
    await authAs(page, 'ivan@example.com');

    await page.locator('app-course-card').first().getByRole('button', { name: 'Toggle Card' }).click();
    await page.locator('app-course-card').first().getByRole('button', { name: 'More info' }).click();

    await expect(page).toHaveURL(/\/course\/1$/);
    await expect(page.getByText('Angular 20 Basics')).toBeVisible();

    await page.getByRole('link', { name: 'Components' }).click();
    await expect(page).toHaveURL(/\/course\/1\/1$/);
    await expect(page.locator('.lesson-container')).toBeVisible();

    await page.locator('.lesson-buttons .p-button-success').click();
    await expect(page).toHaveURL(/\/course\/1\/2$/);

    await page.locator('.lesson-buttons .p-button-outlined').click();
    await expect(page).toHaveURL(/\/course\/1$/);
  });

  test('студент видит отказ в доступе при создании курса', async ({ page }) => {
    await authAs(page, 'ivan@example.com');

    await page.getByRole('button', { name: 'Create course' }).click();
    await expect(page).toHaveURL(/\/create-course$/);
    await expect(page.getByText('Access denied. Only teacher can create a course.')).toBeVisible();
    await expect(page.locator('#title')).toHaveCount(0);
  });

  test('гость может фильтровать курсы по категории', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('app-course-card')).toHaveCount(2);

    await page.locator('.filters p-select').nth(0).click();
    await page.getByRole('option', { name: 'Frontend' }).click();

    await expect(page.locator('app-course-card')).toHaveCount(1);
    await expect(page.getByText('Angular 20 Basics')).toBeVisible();
    await expect(page.getByText('Advanced TypeScript')).toHaveCount(0);
  });

  test('студент может переключить язык профиля на RU', async ({ page }) => {
    await authAs(page, 'ivan@example.com');

    await page.getByRole('button', { name: 'Profile' }).click();
    await expect(page).toHaveURL(/\/profile$/);

    await page.locator('select').selectOption('RU');
    await expect(page.locator('select')).toHaveValue('RU');
    await expect.poll(async () => page.evaluate(() => {
      const profileEl = document.querySelector('app-profile');
      const ng = (window as any).ng;
      const profile = ng?.getComponent?.(profileEl);
      return profile?.i18n?.currentLang;
    })).toBe('ru');
  });

  test('студент не может перейти к следующему уроку с последнего урока', async ({ page }) => {
    await authAs(page, 'ivan@example.com');

    await page.locator('app-course-card').first().getByRole('button', { name: 'Toggle Card' }).click();
    await page.locator('app-course-card').first().getByRole('button', { name: 'More info' }).click();
    await page.getByRole('link', { name: 'Signals' }).click();

    const nextButton = page.locator('.lesson-buttons .p-button-success');
    await expect(nextButton).toBeDisabled();
  });

  test('преподаватель может открыть создание курса и отправить валидную форму', async ({ page }) => {
    await authAs(page, 'anna@example.com');

    await page.getByRole('button', { name: 'Create course' }).click();
    await expect(page).toHaveURL(/\/create-course$/);
    await expect(page.locator('#title')).toBeVisible();
    await expect(page.locator('#description')).toBeVisible();

    const saveButton = page.locator('form').getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeDisabled();

    page.once('dialog', async dialog => {
      await dialog.dismiss();
    });

    await page.locator('#title').fill('E2E Course');
    await page.locator('#description').fill('Created in e2e test');
    await page.locator('#goals').fill('Goal 1, Goal 2');
    await page.locator('#lessons').fill('Lesson 1, Lesson 2');

    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    await expect(page.locator('#title')).toHaveValue('');
    await expect(page.locator('#description')).toHaveValue('');
  });

  test('неизвестный роут открывает страницу 404 и позволяет вернуться на главную', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await expect(page.getByText('Sorry, the page you are looking for does not exist.')).toBeVisible();

    await page.getByRole('button', { name: /Back to home/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

