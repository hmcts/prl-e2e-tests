import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class EditAndApproveAnOrderConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header h1",
    { hasText: "Order approved" },
  );
  private readonly legalRepConfirmationHeader: Locator = this.page.locator(
    "#confirmation-header h1",
    { hasText: "Message sent to legal representative" },
  );
  private readonly nextStepsConfirmationHeader: Locator = this.page.locator(
    "#confirmation-body h3",
    { hasText: "What happens next" },
  );
  private readonly confirmationBody1: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText: " We will send this order to admin.",
    },
  );
  private readonly confirmationBody2: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText:
        "If you have included further directions, admin will also receive them.",
    },
  );
  private readonly legalConfirmationBody: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText: "Your message has been sent to the legal representative.",
    },
  );

  constructor(page: Page) {
    super(page, "Edit and approve a draft order");
  }

  async assertPageContents(judgeOrderAction: string): Promise<void> {
    await this.assertPageHeadings();
    if (judgeOrderAction == "Ask the legal representative to make changes") {
      await expect(this.legalRepConfirmationHeader).toBeVisible();
      await expect(this.legalConfirmationBody).toBeVisible();
    } else {
      await expect(this.confirmationHeader).toBeVisible();
      await expect(this.confirmationBody1).toBeVisible();
      await expect(this.confirmationBody2).toBeVisible();
    }
    await expect(this.nextStepsConfirmationHeader).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
