import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class TransferToAnotherCourtSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Transfer to another court", CommonStaticText.saveAndContinue);
  }
}
