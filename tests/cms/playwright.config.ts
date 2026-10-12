import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

const authFile = path.join(__dirname, '.auth', 'admin.json');

export default defineConfig({
  testDir: __dirname,
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  reporter: 'list',
  projects: [
    {
      name: 'auth-setup',
      testMatch: 'auth.setup.ts',
    },
    {
      name: 'chromium',
      dependencies: ['auth-setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },
  ],
});
