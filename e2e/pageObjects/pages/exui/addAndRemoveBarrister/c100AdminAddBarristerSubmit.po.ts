import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";

export class C100AdminAddBarristerSubmit extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add barrister", {
      snapshotPath: ["caseProgression", "addBarrister"],
      cyaSubmitButton: CommonStaticText.submit,
    });
  }
}
