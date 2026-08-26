import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class AddBarristerSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add barrister", CommonStaticText.submit);
  }
}
