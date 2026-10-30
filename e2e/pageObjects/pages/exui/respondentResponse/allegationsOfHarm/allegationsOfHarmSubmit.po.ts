import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";

export class AllegationsOfHarmSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Allegations of harm", CommonStaticText.saveAndContinue);
  }
}
