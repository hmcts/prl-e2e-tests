import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";

export class EditAndApproveAnOrderSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Edit and approve a draft order", CommonStaticText.submit);
  }
}