import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class DeleteApplicationSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Delete application", "Delete");
  }
}
