import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";

export class DeleteApplication1Page extends EventPage {
  private readonly note: Locator = this.page.getByText(
    "Note: Once you have deleted your application it cannot be resumed",
  );
  private readonly label: Locator = this.page.getByText(
    "I am sure that this application should be deleted",
  );

  constructor(page: Page) {
    super(page, "Delete application");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.note).toBeVisible();
    await expect(this.label).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async checkDeletionCheckBox(): Promise<void> {
    await this.page
      .getByRole("checkbox", {
        name: "I am sure that this application should be deleted",
      })
      .check();
  }
}
