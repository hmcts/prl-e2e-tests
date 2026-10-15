import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";

export class AdminEditAndApproveAnOrder1Page extends EventPage {
  private readonly selectOrderLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Select the order",
    },
  );

  constructor(page: Page) {
    super(page, "Edit and serve an order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.selectOrderLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrder() {
    await this.page
      .locator("#draftOrdersDynamicList")
      .selectOption({ index: 1 });
  }
}
