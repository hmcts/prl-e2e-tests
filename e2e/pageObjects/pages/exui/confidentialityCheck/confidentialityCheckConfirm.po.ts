import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";

export class ConfidentialityCheckConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header h1",
    { hasText: "The application is ready for personal service" },
  );
  private readonly nextStepsConfirmationHeader: Locator = this.page.locator(
    "#confirmation-body h3",
    { hasText: "What happens next" },
  );
  private readonly confirmationBody: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText: "The person arranging personal service will be notified",
    },
  );

  constructor(page: Page) {
    super(page, "Confidentiality check");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.confirmationBody).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
