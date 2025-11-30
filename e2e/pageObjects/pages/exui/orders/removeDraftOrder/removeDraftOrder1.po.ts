import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class RemoveDraftOrder1Page extends EventPage {
  private readonly chooseOrderToRemoveLabel: Locator = this.page.getByText(
    "Choose the order you want to remove",
  );

  constructor(page: Page) {
    super(page, "Remove draft order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.chooseOrderToRemoveLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderToRemove(orderName: string): Promise<void> {
    // unable to match on the order name exactly in the combobox because it contains a very exact time stamp
    const option = this.page.locator("role=option", { hasText: orderName });
    await this.page
      .getByRole("combobox")
      .selectOption({ label: await option.textContent() });
  }
}
