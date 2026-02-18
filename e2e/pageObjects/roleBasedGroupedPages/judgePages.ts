import { Page } from "@playwright/test";
import { SendAndReplyToMessages1Page } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessages1.po.js";
import { SendAndReplyToMessages4Page } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessages4.po.js";
import { SendAndReplyToMessages5Page } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessages5.po.js";
import { SendAndReplyToMessagesConfirmPage } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessagesConfirm.po.js";
import { SendAndReplyToMessagesSubmitPage } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessagesSubmit.po.js";
import { SummaryPage } from "../pages/exui/caseView/summary.po.js";

export class JudgePagesGroup {
  constructor(public readonly page: Page) {}

  get summaryPage() {
    return new SummaryPage(this.page);
  }

  get sendAndReplyToMessages() {
    return {
      sendAndReplyToMessages1Page: new SendAndReplyToMessages1Page(this.page),
      sendAndReplyToMessages4Page: new SendAndReplyToMessages4Page(this.page),
      sendAndReplyToMessages5Page: new SendAndReplyToMessages5Page(this.page),
      sendAndReplyToMessagesConfirmPage: new SendAndReplyToMessagesConfirmPage(
        this.page,
      ),
      sendAndReplyToMessagesSubmitPage: new SendAndReplyToMessagesSubmitPage(
        this.page,
      ),
    };
  }
}
