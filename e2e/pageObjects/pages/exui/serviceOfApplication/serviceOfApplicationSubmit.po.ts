import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class ServiceOfApplicationSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Service of application", CommonStaticText.saveAndContinue);
  }
}
