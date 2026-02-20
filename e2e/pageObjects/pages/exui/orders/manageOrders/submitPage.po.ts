import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

export class SubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Manage orders", CommonStaticText.submit);
  }
}
