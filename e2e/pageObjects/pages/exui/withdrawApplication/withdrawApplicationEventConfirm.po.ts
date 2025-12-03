import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";

export class WithdrawApplicationEventConfirmPage extends EventPage {
  private readonly yesConfirmationHeader: Locator = this.page.locator(
    "#confirmation-header h1",
    { hasText: "Application withdrawn" },
  );

  private readonly noConfirmationHeader: Locator = this.page.locator(
    "#confirmation-header h1",
    { hasText: "Application withdrawn cancelled" },
  );

  private readonly nextStepsConfirmationHeader: Locator = this.page.locator(
    "#confirmation-body h3",
    { hasText: "What happens next" },
  );

  private readonly confirmationBody: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText: "This case will now display as “withdrawn” in your case list.",
    },
  );

  constructor(page: Page) {
    super(page, "Withdraw application");
  }

  async assertPageContents(withdrawApplication: boolean): Promise<void> {
    await this.assertPageHeadings();

    if (withdrawApplication) {
      await expect(this.yesConfirmationHeader).toBeVisible();
      await expect(this.nextStepsConfirmationHeader).toBeVisible();
      await expect(this.confirmationBody).toBeVisible();
    } else {
      await expect(this.noConfirmationHeader).toBeVisible();
    }

    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
