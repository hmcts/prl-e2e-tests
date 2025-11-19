import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class AllocatedJudgeSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Allocated judge", {
      snapshotPath: ["caseProgression", "allocatedJudge"],
      cyaSubmitButton: CommonStaticText.submit,
    });
  }
}
