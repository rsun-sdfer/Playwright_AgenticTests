import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { test, expect } from '@playwright/test';
import { AdminLoginPage, adminTestCredentials } from './pages/login.page';

const authFile = path.join(__dirname, '.auth', 'admin.json');

test('Save Admin authentication storage state', async ({ page, context }) => {
  const loginPage = new AdminLoginPage(page);
  await loginPage.open();
  await loginPage.login(adminTestCredentials.email, adminTestCredentials.password);

  await expect(page).toHaveURL('https://cms.anhtester.com/admin');
  await expect(page.getByRole('link', { name: /Dashboard/ })).toBeVisible();

  await mkdir(path.dirname(authFile), { recursive: true });
  await context.storageState({ path: authFile });
});
