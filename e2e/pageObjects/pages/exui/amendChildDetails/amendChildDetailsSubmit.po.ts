import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class AmendChildDetailsSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Amend Child details", CommonStaticText.saveAndContinue);
  }
}
