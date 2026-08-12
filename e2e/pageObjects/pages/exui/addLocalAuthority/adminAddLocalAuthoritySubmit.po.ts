import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class AdminAddLocalAuthoritySubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add local authority", CommonStaticText.submit);
  }
}
