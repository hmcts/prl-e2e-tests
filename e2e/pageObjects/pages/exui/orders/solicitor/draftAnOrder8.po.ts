import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";

export class DraftAnOrder8Page extends EventPage {
  private readonly fullNameLabel: Locator = this.page.getByText("Full name", {
    exact: true,
  });

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.fullNameLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields(responsibleParentFullName: string): Promise<void> {
    await this.page
      .getByRole("textbox", { name: "Full name" })
      .fill(responsibleParentFullName);
  }
}
