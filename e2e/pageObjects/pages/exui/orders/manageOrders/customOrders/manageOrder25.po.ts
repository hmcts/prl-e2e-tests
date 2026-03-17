import { EventPage } from "../../../eventPage.po.ts";
import { Locator, Page } from "@playwright/test";

export class ManageOrder25Page extends EventPage {
  readonly formLabelOrderApproved: Locator = this.page.getByText(
    "Was the order approved at a hearing?",
  );
  readonly pageText: Locator = this.page.getByText(
    "Check if there are restrictions on who should receive the order",
  );
  readonly selectApplicant: Locator = this.page.locator(
    "#orderRecipients-applicantOrApplicantSolicitor",
  );
  readonly selectRespondent: Locator = this.page.locator(
    "#orderRecipients-respondentOrRespondentSolicitor",
  );

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async selectApprovedAtHearing(yesOrNo: "Yes" | "No"): Promise<void> {
    await this.page.getByLabel(yesOrNo, { exact: true }).check();
  }
}
