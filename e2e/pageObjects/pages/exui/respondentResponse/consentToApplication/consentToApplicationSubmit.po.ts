import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";

// Check your answers for "Do you give your consent?" (c100ResSolConsentingToApplicationA/submit).
// The answers are checked with the shared table snapshot: assertPageContents(snapshotPath, snapshotName).
export class ConsentToApplicationSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Do you give your consent?", CommonStaticText.saveAndContinue);
  }
}
