import { Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class Fl401RemoveLegalRepresentativeSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Remove legal representative", {
      snapshotPath: ["removeLegalRepresentative"],
      cyaSubmitButton: CommonStaticText.submit,
    });
  }
}
