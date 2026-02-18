import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class SendAndReplyToMessages3Page extends EventPage {
  readonly messageLabel: Locator = this.page.locator(Selectors.GovukFormLabel, {
    hasText: "Enter your message",
  });
  readonly messageHint: Locator = this.page.locator(Selectors.GovukFormHint, {
    hasText:
      "Explain what you're requesting and why. Include answers and decisions you need.",
  });
  readonly messageContentTextArea: Locator =
    this.page.locator("#messageContent");

  constructor(page: Page) {
    super(page, "Send and reply to messages");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.messageLabel).toBeVisible();
    await expect(this.messageHint).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async enterMessage() {
    await this.messageContentTextArea.fill("Test message content");
  }
}
