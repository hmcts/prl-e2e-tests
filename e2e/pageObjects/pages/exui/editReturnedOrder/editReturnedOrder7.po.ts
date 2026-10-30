import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../common/types.ts";

export class EditReturnedOrder7Page extends EventPage {
  private readonly fullNameParentText: Locator = this.page
    .getByText("Full name")
    .first();
  private readonly parentNameField: Locator = this.page
    .getByRole("textbox", { name: "Full name" })
    .first();

  constructor(page: Page) {
    super(page, "Edit a returned order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.fullNameParentText).toBeVisible();
    await expect(this.parentNameField).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields(): Promise<void> {
    await this.parentNameField.fill("Test parent name");
  }
}
