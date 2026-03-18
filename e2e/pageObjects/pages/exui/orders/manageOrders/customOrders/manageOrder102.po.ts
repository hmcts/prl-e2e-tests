import { EventPage } from "../../../eventPage.po.ts";
import { Locator, Page } from "@playwright/test";

export class ManageOrder102Page extends EventPage {
  readonly formLabelOrderApproved: Locator = this.page.getByText(
    "Was the order approved at a hearing?",
  );
  readonly yesRadio: Locator = this.page.locator(
    "customOrderWasApprovedAtHearing_Yes",
  );
  readonly noRadio: Locator = this.page.locator(
    "customOrderWasApprovedAtHearing_No",
  );
  readonly formLabelWhichHearing: Locator = this.page.getByText(
    "At which hearing was the order approved?",
  );
  readonly hearingDropdown: Locator = this.page.locator(
    "#customOrderHearingsType",
  );
  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async selectApprovedAtHearing(yesOrNo: "Yes" | "No"): Promise<void> {
    await this.page.getByLabel(yesOrNo, { exact: true }).click();
  }

  async selectWhichHearing(): Promise<void> {
    await this.hearingDropdown.selectOption({ index: 0 });
  }
}
