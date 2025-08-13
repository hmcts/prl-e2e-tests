import { expect, Locator, Page } from "@playwright/test";

export class ExuiHeaderComponent {
  readonly globalHeader: Locator = this.page.locator(
    "exui-hmcts-global-header",
  );
  readonly hmctsHeader: Locator = this.page.locator(".hmcts-header");
  readonly navigationHeader: Locator = this.page.locator(
    ".hmcts-primary-navigation",
  );

  constructor(private page: Page) {}

  async checkIsVisible(): Promise<void> {
    await expect(this.globalHeader).toBeVisible();
  }
}
