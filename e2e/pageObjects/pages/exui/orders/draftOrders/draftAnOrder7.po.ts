import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { OrderTypes } from "../../../../../common/types.js";

export class DraftAnOrder7Page extends EventPage {
  readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Full name",
  });
  readonly heading3: Locator = this.page.locator(Selectors.h3, {
    hasText: "Full name",
  });

  readonly removeButton = this.page.getByRole("button", { name: "Remove" });

  readonly addButtons = this.page.getByRole("button", { name: "Add new" });

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.heading2).toBeVisible();
    await expect(this.heading3).toBeVisible();
    await expect(this.addButtons).toHaveCount(2);
    await expect(this.addButtons.first()).toBeVisible();
    await expect(this.removeButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillOrderDetails(): Promise<void> {
    await this.page
      .getByRole("textbox", { name: "Full name" })
      .fill("Test Name");
  }
}
