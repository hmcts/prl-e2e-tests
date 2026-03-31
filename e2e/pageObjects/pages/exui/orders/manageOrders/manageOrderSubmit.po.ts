import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";

export class ManageOrderSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Manage orders", CommonStaticText.submit);
  }
}
