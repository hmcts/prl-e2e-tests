import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class ReturnApplicationSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Return application", CommonStaticText.saveAndContinue);
  }
}
