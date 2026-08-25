import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class RequestFurtherInformationSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(
      page,
      "Request Further Information",
      CommonStaticText.saveAndContinue,
    );
  }
}
