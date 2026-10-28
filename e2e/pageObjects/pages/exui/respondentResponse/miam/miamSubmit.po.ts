import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";

// Check your answers for "MIAM" (c100ResSolMiamA/submit).
// The answers are checked with the shared table snapshot: assertPageContents(snapshotPath, snapshotName).
export class MiamSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "MIAM", CommonStaticText.saveAndContinue);
  }
}
