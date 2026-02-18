import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class AmendApplicantDetailsSubmit extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Amend respondent details", CommonStaticText.saveAndContinue);
  }
}
