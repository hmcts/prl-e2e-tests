import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class RemoveBarristerSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Remove barrister", CommonStaticText.submit);
  }
}
