import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class StopRepresentingSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Stop representing client", CommonStaticText.submit);
  }
}
