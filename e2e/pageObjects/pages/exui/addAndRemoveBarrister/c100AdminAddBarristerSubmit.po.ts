import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class C100AdminAddBarrister2Page extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add barrister", {
      snapshotPath: ["caseProgression", "addBarrister"],
      submitButtonText: CommonStaticText.submit,
    });
  }
}
