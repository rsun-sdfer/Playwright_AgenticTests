import type { Page } from '@playwright/test';
import { AddNewProductPage, type ProductData } from './add-new-product.page';

export class CreateProductPage extends AddNewProductPage {
  constructor(page: Page) {
    super(page);
  }

  async createUnpublishedProduct(data: ProductData) {
    await this.fillRequiredFields(data);
    await this.saveUnpublished.click();
  }

  async createPublishedProduct(data: ProductData) {
    await this.fillRequiredFields(data);
    await this.savePublished.click();
  }
}
