import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class ListWithoutNoticeConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header h1",
    { hasText: "Listing instructions sent to admin" },
  );
  private readonly nextStepsConfirmationHeader: Locator = this.page.locator(
    "#confirmation-body h3",
    { hasText: "What happens next" },
  );
  private readonly confirmationBody1: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText: "Admin will be notified to list the case without notice.",
    },
  );
  private readonly confirmationBody2: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText: "The hearing instructions will be saved in case notes.",
    },
  );

  constructor(page: Page) {
    super(page, "List without notice");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.nextStepsConfirmationHeader).toBeVisible();
    await expect(this.confirmationBody1).toBeVisible();
    await expect(this.confirmationBody2).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
