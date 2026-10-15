import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";
import { Page } from "@playwright/test";

export class RestrictedCaseAccessSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Mark case as restricted", "Mark case as restricted");
  }
}
