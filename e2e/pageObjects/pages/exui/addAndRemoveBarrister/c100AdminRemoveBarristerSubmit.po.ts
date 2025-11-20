import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class C100AdminRemoveBarristerSubmit extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Remove barrister", {
      snapshotPath: ["caseProgression", "removeBarrister"],
      cyaSubmitButton: CommonStaticText.submit,
    });
  }
}
