import { Page } from "@playwright/test";
import { RespondentResponseSubmitPage } from "../respondentResponseSubmit.po.js";

// Check your answers for "Attending the court" (c100ResSolAttendingTheCourtA/submit).
// The answers are compared with a snapshot of the answers table.
export class AttendingTheCourtSubmitPage extends RespondentResponseSubmitPage {
  constructor(page: Page) {
    super(page, "Attending the court");
  }
}
