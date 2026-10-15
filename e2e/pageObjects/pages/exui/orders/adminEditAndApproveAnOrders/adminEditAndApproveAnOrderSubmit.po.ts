import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { Page } from "@playwright/test";

export class AdminEditAndApproveAnOrderSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Edit and serve an order", CommonStaticText.submit);
  }
}
