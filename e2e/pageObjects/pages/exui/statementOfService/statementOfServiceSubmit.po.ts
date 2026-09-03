import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class StatementOfServiceSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Statement of service", CommonStaticText.saveAndContinue);
  }
}
