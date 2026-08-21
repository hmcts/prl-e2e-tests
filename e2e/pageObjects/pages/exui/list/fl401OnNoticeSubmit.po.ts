import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class Fl401OnNoticeSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "List on notice", CommonStaticText.submit);
  }
}
