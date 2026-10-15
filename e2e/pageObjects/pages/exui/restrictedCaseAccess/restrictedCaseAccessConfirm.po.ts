import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";

export class RestrictedCaseAccessConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header",
  );
  private readonly instruction: Locator = this.page.getByText(
    "You can return to My Work.",
  );

  constructor(page: Page) {
    super(page, "Mark case as restricted");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.confirmationHeader.getByRole("heading", {
        name: "Case marked as restricted",
      }),
    ).toBeVisible();
    await expect(
      this.confirmationHeader.getByRole("heading", {
        name: "Only those with allocated roles on this case can access it",
      }),
    ).toBeVisible();
    await expect(this.instruction).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
