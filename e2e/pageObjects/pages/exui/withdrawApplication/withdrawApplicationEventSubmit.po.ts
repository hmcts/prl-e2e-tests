import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";

export class WithdrawApplicationEventSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Withdraw application", {
      snapshotPath: ["caseProgression", "withdrawApplication"],
      submitButtonText: CommonStaticText.saveAndContinue,
    });
  }
}
