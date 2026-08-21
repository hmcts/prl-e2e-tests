import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class ListWithoutNoticeSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "List without notice", CommonStaticText.submit);
  }
}
