# Specs

This directory contains the test plans and browser automation specs for the Playwright-based CMS testing suite.

## What the tests do

The automated tests in this repository exercise the Active eCommerce CMS admin flow in a real browser. They validate that common admin tasks work correctly and that invalid or edge-case input is rejected as expected.

The current suite includes tests for:

- Login flow and invalid password validation
- Creating and publishing products
- Product form validation and required fields
- Edge cases for product names, pricing, stock, tax, and discount inputs
- Regression checks for the CMS add-product workflow

The detailed scenario coverage is documented in:

- `specs/AddNewProduct.md`
- `specs/login-testplan.md`

## Test setup

The Playwright configuration is defined in `tests/cms/playwright.config.ts`.

It uses a saved admin authentication state in `tests/cms/.auth/admin.json` so the browser tests can start from an authenticated admin session without re-entering credentials.

## How to run the tests

Prerequisites:

- Node.js 18 or later
- npm

Install dependencies from the repository root:

```bash
npm install
npx playwright install --with-deps
```

Run the CMS test suite:

```bash
npx playwright test --config=tests/cms/playwright.config.ts
```

Run a single spec file:

```bash
npx playwright test tests/cms/login.spec.ts --config=tests/cms/playwright.config.ts
```

Run a single browser project:

```bash
npx playwright test --project=chromium --config=tests/cms/playwright.config.ts
```

Open the Playwright report after running tests:

```bash
npx playwright show-report
```

## Notes

- The config file sets `fullyParallel: false` to keep the tests isolated.
- The `auth-setup` project runs first so the authenticated storage state is ready before the main browser tests start.
