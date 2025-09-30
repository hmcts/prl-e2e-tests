import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100RemoveLegalRepresentativeSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Remove legal representative", {
      snapshotPath: ["removeLegalRepresentative"],
      submitButtonText: CommonStaticText.submit,
    });
  }
}
