import { test, expect } from '@playwright/test';
import { AdminLoginPage, adminTestCredentials } from './pages/login.page';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('CMS Admin Login', () => {
  test('Valid Admin credentials navigate to Dashboard', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);

    // 1. Open the login page in a fresh browser context.
    await loginPage.open();

    // 2. Verify the login page and its controls.
    await expect(page).toHaveTitle('Active eCommerce CMS | Anh Tester Demo');
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.rememberMe).toBeVisible();
    await expect(loginPage.forgotPassword).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // 3. Submit valid Admin credentials.
    await loginPage.login(adminTestCredentials.email, adminTestCredentials.password);

    // 4. Verify successful navigation to the Dashboard.
    await expect(page).toHaveURL('https://cms.anhtester.com/admin');
    await expect(page.getByRole('link', { name: /Dashboard/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Category wise product sale' })).toBeVisible();
  });
});
