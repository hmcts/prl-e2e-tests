import { CheckYourAnswersPage } from "../../checkYourAnswers.po";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";

export class DraftAnOrderSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Create/upload draft order", CommonStaticText.submit);
  }
}
