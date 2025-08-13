import { expect, Locator, Page } from "@playwright/test";

export class ExuiHeaderComponent {
  readonly page: Page;
  readonly globalHeader: Locator;
  readonly hmctsHeader: Locator;
  readonly navigationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.globalHeader = page.locator("exui-hmcts-global-header");
    this.hmctsHeader = page.locator(".hmcts-header");
    this.navigationHeader = page.locator(".hmcts-primary-navigation");
  }

  async checkIsVisible(): Promise<void> {
    await expect(this.globalHeader).toBeVisible();
  }
}
