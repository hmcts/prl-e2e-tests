import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class EditAndApproveAnOrderConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header h1",
    { hasText: "Order approved" },
  );
  private readonly nextStepsConfirmationHeader: Locator = this.page.locator(
    "#confirmation-body h3",
    { hasText: "What happens next" },
  );
  private readonly confirmationBody: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText:
        "We will send this order to admin. If you have included further directions, admin will also receive them.",
    },
  );

  constructor(page: Page) {
    super(page, "Edit and approve a draft order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.confirmationBody).toBeVisible();
    await expect(this.nextStepsConfirmationHeader).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}