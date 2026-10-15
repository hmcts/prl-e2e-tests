import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { HearingRequestPage } from "./hearingRequestPage.po.ts";

export class HearingLinkPage extends HearingRequestPage {
  readonly linkedHearingInformation: Locator = this.page.locator(
    Selectors.GovukInsetText,
    {
      hasText:
        "If you choose 'No', you will be unable to link this hearing to any others without editing it.",
    },
  );
  readonly casesTableHeading: Locator = this.page.locator(
    Selectors.GovukTableHeader,
    { hasText: "Cases number and name" },
  );
  readonly reasonsTableHeading: Locator = this.page.locator(
    Selectors.GovukTableHeader,
    { hasText: "Reasons for case link" },
  );
  readonly linkHearingNo: Locator = this.page.locator("#no");

  constructor(page: Page) {
    super(page, "Will this hearing need to be linked to other hearings?");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadingAndContinue();
    await Promise.all([
      expect(this.linkedHearingInformation).toBeVisible(),
      expect(this.casesTableHeading).toBeVisible(),
      expect(this.reasonsTableHeading).toBeVisible(),
    ]);
  }

  async fillInFields(): Promise<void> {
    await this.linkHearingNo.check();
  }
}
