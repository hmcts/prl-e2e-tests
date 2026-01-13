import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class SendAndReplyToMessages1Page extends EventPage {
  readonly actionFormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Do you want to send or reply to a message?",
    },
  );
  readonly sendFormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Send a message",
    },
  );

  readonly replyFormLabel = this.page.getByText("Reply to a message", {
    exact: true,
  });
  readonly radioSend: Locator = this.page.locator("#chooseSendOrReply-SEND");
  readonly radioReply: Locator = this.page.locator("#chooseSendOrReply-REPLY");
  readonly replyDropdownOption: Locator = this.page.locator(
    "#messageReplyDynamicList",
  );

  constructor(page: Page) {
    super(page, "Send and reply to messages");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.actionFormLabel).toBeVisible();
    await expect(this.sendFormLabel).toBeVisible();
    await expect(this.replyFormLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectSend(): Promise<void> {
    await this.radioSend.click();
  }

  async selectReply(): Promise<void> {
    await this.radioReply.click();
    await this.replyDropdownOption.selectOption({ index: 1 });
  }
}
