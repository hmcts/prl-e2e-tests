import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";

// Check your answers for "Allegations of harm" (c100ResSolAllegationsOfHarmA/submit).
// The answers are checked with the shared table snapshot: assertPageContents(snapshotPath, snapshotName).
export class AllegationsOfHarmSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Allegations of harm", CommonStaticText.saveAndContinue);
  }
}
