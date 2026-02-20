import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { CheckYourAnswersPage } from "../checkYourAnswers.po";

export class C100AdminRemoveBarristerSubmit extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Remove barrister", CommonStaticText.submit);
  }
}
