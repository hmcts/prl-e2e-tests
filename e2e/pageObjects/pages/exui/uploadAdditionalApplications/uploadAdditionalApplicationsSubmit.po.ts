import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class UploadAdditionalApplicationsSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(
      page,
      "Upload additional applications",
      CommonStaticText.saveAndContinue,
    );
  }
}