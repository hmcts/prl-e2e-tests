import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { HearingRequestPage } from "./hearingRequestPage.po.ts";

export class HearingRequirementsPage extends HearingRequestPage {
  readonly reasonableAdjustmentsInformation: Locator = this.page.locator(
    Selectors.GovukInsetText,
    {
      hasText:
        "Any reasonable adjustments on this page will be included in the hearing request.",
    },
  );

  constructor(page: Page) {
    super(page, "Hearing requirements");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadingAndContinue();
    await expect(this.reasonableAdjustmentsInformation).toBeVisible();
  }
}
