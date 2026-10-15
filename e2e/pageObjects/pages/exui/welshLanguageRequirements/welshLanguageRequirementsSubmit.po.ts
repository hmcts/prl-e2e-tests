import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

/**
 * Every answer on this page comes from a fixed set of options, so the table
 * holds no dynamic values and can be asserted with a snapshot.
 */
export class WelshLanguageRequirementsSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(
      page,
      "Welsh language requirements",
      CommonStaticText.saveAndContinue,
    );
  }
}
