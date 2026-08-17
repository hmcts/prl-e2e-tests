import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class ExitAwaitingInformationSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Exit Awaiting Information", CommonStaticText.saveAndContinue);
  }
}
