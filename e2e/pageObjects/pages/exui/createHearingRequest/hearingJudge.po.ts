import { expect, Locator, Page } from "@playwright/test";
import { HearingRequestPage } from "./hearingRequestPage.po.ts";

export class HearingJudgePage extends HearingRequestPage {
  readonly specificJudgeNo: Locator = this.page.locator("#noSpecificJudge");
  private readonly selectedJudgeTypeCodes: string[] = [
    "19",
    "30",
    "24",
    "33",
    "45",
    "46",
  ];

  constructor(page: Page) {
    super(page, "Do you want a specific judge?");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadingAndContinue();
    await expect(this.specificJudgeNo).toBeVisible();
  }

  async fillInFields(): Promise<void> {
    await this.specificJudgeNo.check();
    for (const judgeTypeCode of this.selectedJudgeTypeCodes) {
      await this.page
        .locator(`input[type="checkbox"][value="${judgeTypeCode}"]`)
        .check();
    }
  }
}
