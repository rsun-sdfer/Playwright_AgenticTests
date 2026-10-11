import { test, expect } from '@playwright/test';
import { AddNewProductPage } from './pages/add-new-product.page';

test.describe('CMS Admin Add New Product', () => {
  test('Empty product submission shows required-field validation', async ({ page }) => {
    const productPage = new AddNewProductPage(page);

    // 1. Restore the saved Admin authentication state and open the product form.
    await productPage.open();

    // 2. Verify the form is displayed.
    await expect(productPage.heading).toBeVisible();
    await expect(productPage.productName).toBeVisible();

    // 3. Leave fields empty and submit.
    await productPage.savePublished.click();

    // 4. Verify required-field validation prevents submission.
    await expect(page).toHaveURL('https://cms.anhtester.com/admin/products/create');
    await expect(productPage.heading).toBeVisible();
    await expect(productPage.productName).toBeFocused();
  });
});
