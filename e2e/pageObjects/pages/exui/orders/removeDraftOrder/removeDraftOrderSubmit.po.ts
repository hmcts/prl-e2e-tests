import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";

export class RemoveDraftOrderSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Remove draft order", CommonStaticText.submit);
  }
}
