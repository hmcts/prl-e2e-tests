import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";

export class Fl401AddCaseNumberSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add case number", {
      snapshotPath: ["caseProgression", "checkApplication"],
      submitButtonText: CommonStaticText.saveAndContinue,
    });
  }
}
