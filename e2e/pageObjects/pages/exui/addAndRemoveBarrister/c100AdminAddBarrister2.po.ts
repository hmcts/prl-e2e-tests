import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";

export class C100AdminAddBarrister2Page extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add Barrister", {
      snapshotPath: ["caseProgression", "addAndRemoveBarrister"],
      submitButtonText: CommonStaticText.submit,
    });
  }
}
