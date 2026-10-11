import type { Locator, Page } from '@playwright/test';

export const adminTestCredentials = {
  email: process.env.CMS_ADMIN_EMAIL ?? 'admin@example.com',
  password: process.env.CMS_ADMIN_PASSWORD ?? '123456',
};

export class AdminLoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly rememberMe: Locator;
  readonly forgotPassword: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.rememberMe = page.getByRole('checkbox', { name: 'Remember Me' });
    this.forgotPassword = page.getByRole('link', { name: 'Forgot password ?' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto('https://cms.anhtester.com/login');
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
