import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class SendAndReplyToMessagesSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Send and reply to messages", CommonStaticText.saveAndContinue);
  }
}
