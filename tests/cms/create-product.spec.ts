import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { test, expect } from '@playwright/test';
import { CreateProductPage } from './pages/create-product.page';
import type { ProductData } from './pages/add-new-product.page';

test.describe('CMS Admin Add New Product', () => {
  test('Save a valid product using the shared fixture', async ({ page }) => {
    // 1. Restore Admin authentication state and load isolated reusable product data.
    const fixturePath = path.join(__dirname, 'helpers', 'product-data.json');
    const fixture = JSON.parse(await readFile(fixturePath, 'utf8')) as ProductData;
    const data = { ...fixture, name: `${fixture.name} ${Date.now()}` };
    const productPage = new CreateProductPage(page);
    await productPage.open();

    // 2. Create the product as unpublished and verify the save result.
    await productPage.createUnpublishedProduct(data);
    await expect(page.getByText(/successfully/i).first()).toBeVisible();
  });
});
