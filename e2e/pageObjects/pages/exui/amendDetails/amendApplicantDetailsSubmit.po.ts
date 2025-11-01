import { Page, expect } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";
import { CheckYourAnswersTableComponent } from "../../../components/exui/checkYourAnswersTable.component.ts";

export class AmendApplicantDetailsSubmitPage extends EventPage {
  readonly cyaTable: CheckYourAnswersTableComponent;

  constructor(page: Page) {
    super(page, "Amend applicant details");
    this.cyaTable = new CheckYourAnswersTableComponent(page);
  }

  async checkPageLoaded() {
    await expect(this.pageHeading).toBeVisible();
  }

  async checkCYASnapshot() {
    await this.cyaTable.runVisualTest([
      "amendDetails",
      "fl401-amend-applicant-details",
    ]);
  }
}
