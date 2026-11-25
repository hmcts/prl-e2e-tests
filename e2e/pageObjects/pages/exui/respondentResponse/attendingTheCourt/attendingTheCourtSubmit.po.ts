import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";

// Check your answers for "Attending the court" (c100ResSolAttendingTheCourtA/submit).
// The answers are checked with the shared table snapshot: assertPageContents(snapshotPath, snapshotName).
export class AttendingTheCourtSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Attending the court", CommonStaticText.saveAndContinue);
  }
}
