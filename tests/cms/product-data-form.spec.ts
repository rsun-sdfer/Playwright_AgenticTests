import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { test, expect } from '@playwright/test';
import { AddNewProductPage, type ProductData } from './pages/add-new-product.page';

test.describe('CMS Admin Add New Product', () => {
  test('Reusable product data fills the Add New Product form', async ({ page }) => {
    // 1. Restore saved Admin authentication state and load an isolated fixture copy.
    const fixturePath = path.join(__dirname, 'helpers', 'product-data.json');
    const fixture = JSON.parse(await readFile(fixturePath, 'utf8')) as ProductData;
    const data = { ...fixture, name: `${fixture.name} ${Date.now()}` };
    const productPage = new AddNewProductPage(page);
    await productPage.open();

    // 2. Fill the form with the shared fixture values.
    await productPage.fillRequiredFields(data);

    // 3. Verify values without submitting or creating a product.
    await expect(productPage.productName).toHaveValue(data.name);
    await expect(productPage.category).toHaveValue(/.+/);
    await expect(productPage.unit).toHaveValue(data.unit);
    await expect(productPage.minQuantity).toHaveValue(String(data.minQty));
    await expect(productPage.unitPrice).toHaveValue(data.unitPrice.toFixed(2));
    await expect(productPage.discount).toHaveValue(String(data.discount));
    await expect(productPage.quantity).toHaveValue(String(data.currentStock));
    await expect(productPage.tax).toHaveValue(String(data.tax));
    await expect(productPage.savePublished).toBeVisible();
  });
});
