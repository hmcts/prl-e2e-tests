import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";

export class EditContactDetailsSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Edit contact details", CommonStaticText.saveAndContinue);
  }
}
