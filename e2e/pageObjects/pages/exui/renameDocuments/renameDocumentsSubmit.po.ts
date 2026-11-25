import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class RenameDocumentsSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Rename documents", CommonStaticText.submit);
  }
}
