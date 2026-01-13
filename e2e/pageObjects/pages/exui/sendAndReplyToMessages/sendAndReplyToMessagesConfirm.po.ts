import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class SendAndReplyToMessagesConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-body h3",
    { hasText: "What happens next" },
  );
  private readonly confirmationBody: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText: "Your message has been sent.",
    },
  );

  constructor(page: Page) {
    super(page, "Send and reply to messages");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.confirmationBody).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
