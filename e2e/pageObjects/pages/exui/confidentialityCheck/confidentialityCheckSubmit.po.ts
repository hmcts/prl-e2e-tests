import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";

export class ConfidentialityCheckSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Confidentiality check", CommonStaticText.saveAndContinue);
  }
}
