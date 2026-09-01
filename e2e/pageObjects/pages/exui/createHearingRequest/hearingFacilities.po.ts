import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { HearingRequestPage } from "./hearingRequestPage.po.ts";

export class HearingFacilitiesPage extends HearingRequestPage {
  readonly activeFlagsInformation: Locator = this.page.locator(
    Selectors.GovukInsetText,
    {
      hasText:
        "Any active flags on this case may require additional facilities at the hearing.",
    },
  );
  readonly additionalSecurityHeading: Locator = this.page.locator(
    Selectors.GovukFieldsetHeading,
    { hasText: "Will additional security be required?" },
  );
  readonly additionalFacilitiesHeading: Locator = this.page.locator(
    Selectors.GovukFieldsetHeading,
    { hasText: "Select any additional facilities required" },
  );
  readonly additionalSecurityNo: Locator = this.page.locator(
    "#additionalSecurityNo",
  );

  constructor(page: Page) {
    super(page, "Do you require any additional facilities?");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadingAndContinue();
    await Promise.all([
      expect(this.activeFlagsInformation).toBeVisible(),
      expect(this.additionalSecurityHeading).toBeVisible(),
      expect(this.additionalFacilitiesHeading).toBeVisible(),
    ]);
  }

  async fillInFields(): Promise<void> {
    await this.additionalSecurityNo.check();
  }
}
