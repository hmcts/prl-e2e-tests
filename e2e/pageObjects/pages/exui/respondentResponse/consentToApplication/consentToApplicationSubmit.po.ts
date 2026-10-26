import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";

export class ConsentToApplicationSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Do you give your consent?", CommonStaticText.saveAndContinue);
  }
}
