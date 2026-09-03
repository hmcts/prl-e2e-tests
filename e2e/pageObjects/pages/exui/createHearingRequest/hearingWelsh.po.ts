import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { HearingRequestPage } from "./hearingRequestPage.po.ts";

export class HearingWelshPage extends HearingRequestPage {
  readonly welshHearingHint: Locator = this.page.locator(Selectors.GovukHint, {
    hasText: "This means the entire hearing will be carried out in Welsh.",
  });
  readonly welshHearingNo: Locator = this.page.locator("#welsh_hearing_no");

  constructor(page: Page) {
    super(page, "Does this hearing need to be in Welsh?");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadingAndContinue();
    await expect(this.welshHearingHint).toBeVisible();
  }

  async fillInFields(): Promise<void> {
    await this.welshHearingNo.check();
  }
}
