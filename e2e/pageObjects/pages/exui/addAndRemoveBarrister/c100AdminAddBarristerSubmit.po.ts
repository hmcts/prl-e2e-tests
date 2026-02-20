import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { CheckYourAnswersPage } from "../checkYourAnswers.po";

export class C100AdminAddBarristerSubmit extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add barrister", CommonStaticText.submit);
  }
}
