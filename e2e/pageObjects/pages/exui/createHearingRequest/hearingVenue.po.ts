import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { HearingRequestPage } from "./hearingRequestPage.po.ts";

export class HearingVenuePage extends HearingRequestPage {
  readonly facilitiesInformation: Locator = this.page.locator(
    Selectors.GovukInsetText,
    {
      hasText:
        "You can check the venue has the required facilities or reasonable adjustments using",
    },
  );
  readonly remoteHearingHint: Locator = this.page.locator(Selectors.GovukHint, {
    hasText:
      "If this is a fully remote hearing you must still select the court or tribunal which will be managing the case.",
  });
  readonly selectedVenue: Locator = this.page.getByRole("link", {
    name: "Click to remove: Swansea Civil And Family Justice Centre",
    exact: true,
  });

  constructor(page: Page) {
    super(page, "What are the hearing venue details?");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadingAndContinue();
    await Promise.all([
      expect(this.facilitiesInformation).toBeVisible(),
      expect(this.remoteHearingHint).toBeVisible(),
      expect(this.selectedVenue).toBeVisible(),
    ]);
  }
}
