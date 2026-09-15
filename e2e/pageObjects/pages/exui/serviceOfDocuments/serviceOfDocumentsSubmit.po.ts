import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class ServiceOfDocumentsSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Service of documents", CommonStaticText.saveAndContinue);
  }
}
