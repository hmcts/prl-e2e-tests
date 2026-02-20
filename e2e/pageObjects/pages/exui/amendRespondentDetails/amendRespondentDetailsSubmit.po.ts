import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po";
import { CommonStaticText } from "../../../../common/commonStaticText";

export class AmendRespondentDetailsSubmit extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Amend respondent details", CommonStaticText.saveAndContinue);
  }
}
