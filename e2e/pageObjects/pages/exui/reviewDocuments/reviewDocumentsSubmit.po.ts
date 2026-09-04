import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class ReviewDocumentsSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Review documents", CommonStaticText.submit);
  }
}
