import { test, expect } from '@playwright/test';
import { AddNewProductPage } from './pages/add-new-product.page';

test.describe('CMS Admin Add New Product', () => {
  test('Product form shows all required controls', async ({ page }) => {
    const productPage = new AddNewProductPage(page);

    // 1. Restore the saved Admin authentication state and open Add New Product.
    await productPage.open();

    // 2. Verify the product form sections.
    await expect(productPage.heading).toBeVisible();
    for (const sectionName of [
      'Product Information',
      'Product Images',
      'Product Videos',
      'Product Variation',
      'Product price + stock',
      'Product Description',
      'PDF Specification',
      'SEO Meta Tags',
      'Shipping Configuration',
    ]) {
      await expect(page.getByRole('heading', { name: sectionName })).toBeVisible();
    }

    // 3. Verify required controls and product save actions.
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.category).toBeAttached();
    await expect(productPage.unit).toBeVisible();
    await expect(productPage.minQuantity).toBeVisible();
    await expect(productPage.unitPrice).toBeVisible();
    await expect(productPage.discount).toBeVisible();
    await expect(productPage.quantity).toBeVisible();
    await expect(productPage.tax).toBeVisible();
    await expect(productPage.saveUnpublished).toBeVisible();
    await expect(productPage.savePublished).toBeVisible();
  });
});
