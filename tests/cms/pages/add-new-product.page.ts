import type { Locator, Page } from '@playwright/test';
import { AdminLoginPage, adminTestCredentials } from './login.page';

export interface ProductData {
  name: string;
  categoryName: string;
  unit: string;
  minQty: number;
  unitPrice: number;
  discount: number;
  discountType: string;
  currentStock: number;
  tax: number;
  taxType: string;
}

export class AddNewProductPage {
  readonly heading: Locator;
  readonly productName: Locator;
  readonly category: Locator;
  readonly unit: Locator;
  readonly minQuantity: Locator;
  readonly unitPrice: Locator;
  readonly discount: Locator;
  readonly discountType: Locator;
  readonly quantity: Locator;
  readonly tax: Locator;
  readonly taxType: Locator;
  readonly saveUnpublished: Locator;
  readonly savePublished: Locator;

  constructor(protected readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Add New Product' });
    this.productName = page.getByRole('textbox', { name: 'Product Name' });
    this.category = page.locator('select[name="category_id"]');
    this.unit = page.getByPlaceholder('Unit (e.g. KG, Pc etc)');
    this.minQuantity = page.locator('input[name="min_qty"]');
    this.unitPrice = page.getByRole('spinbutton', { name: 'Unit price' });
    this.discount = page.getByRole('spinbutton', { name: 'Discount' });
    this.discountType = page.locator('select[name="discount_type"]');
    this.quantity = page.getByPlaceholder('Quantity');
    this.tax = page.getByRole('spinbutton', { name: 'Tax' });
    this.taxType = page.locator('select[name="tax_type[]"]');
    this.saveUnpublished = page.getByRole('button', { name: 'Save & Unpublish' });
    this.savePublished = page.getByRole('button', { name: 'Save & Publish' });
  }

  async open() {
    await this.page.goto('https://cms.anhtester.com/admin/products/create');
    if (new URL(this.page.url()).pathname === '/login') {
      const loginPage = new AdminLoginPage(this.page);
      await loginPage.login(adminTestCredentials.email, adminTestCredentials.password);
      await this.page.goto('https://cms.anhtester.com/admin/products/create');
    }
  }

  async fillRequiredFields(data: ProductData) {
    await this.productName.fill(data.name);
    await this.category.selectOption({ label: data.categoryName });
    await this.unit.fill(data.unit);
    await this.minQuantity.fill(String(data.minQty));
    await this.unitPrice.fill(data.unitPrice.toFixed(2));
    await this.discount.fill(String(data.discount));
    await this.discountType.selectOption({ label: data.discountType });
    await this.quantity.fill(String(data.currentStock));
    await this.tax.fill(String(data.tax));
    await this.taxType.selectOption({ label: data.taxType });
  }
}
