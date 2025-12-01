import { expect, Locator, Page } from "@playwright/test";

export class MatTabHeaderComponent {
  readonly tabHeader: Locator = this.page.locator("mat-tab-header");

  constructor(private page: Page) {}

  async assertTabDoesNotExist(tabName: string): Promise<void> {
    const tab: Locator = this.tabHeader.getByRole("tab", { name: tabName });
    await expect(tab).toBeHidden();
  }
}
