import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.ts";
import { Page } from "@playwright/test";

export class C100InternationalElementSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "International element", CommonStaticText.saveAndContinue);
  }
}
