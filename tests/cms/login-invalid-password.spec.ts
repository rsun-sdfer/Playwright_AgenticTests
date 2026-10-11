import { test, expect } from '@playwright/test';
import { AdminLoginPage, adminTestCredentials } from './pages/login.page';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('CMS Admin Login', () => {
  test('Incorrect password does not authenticate the user', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);

    // 1. Open the login page in an unauthenticated browser context.
    await loginPage.open();

    // 2. Enter the account email and an incorrect password.
    await loginPage.email.fill(adminTestCredentials.email);
    await loginPage.password.fill('invalid-password-for-test');

    // 3. Submit the invalid credentials.
    await loginPage.loginButton.click();

    // 4. Verify the login page remains visible and authentication was rejected.
    await expect(page).toHaveURL('https://cms.anhtester.com/login');
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
