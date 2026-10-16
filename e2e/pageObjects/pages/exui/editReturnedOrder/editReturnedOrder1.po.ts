import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class EditReturnedOrder1Page extends EventPage {
  private readonly formLabel: Locator = this.page.getByText(
    "Select the order",
  );
    private readonly orderDropdownList: Locator = this.page.locator("#rejectedOrdersDynamicList");

  constructor(page: Page) {
    super(page, "Edit a returned order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.formLabel).toBeVisible();
    await expect(this.orderDropdownList).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrder(): Promise<void> {
      await this.page.locator("#rejectedOrdersDynamicList").selectOption({ index: 1});
  }
}
