import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class SummaryPage extends CaseAccessViewPage {
  readonly allocatedJudgeLabel: Locator = this.page.locator(
    "#case-viewer-field-read--allocatedJudgeLabel",
  );
  readonly allocatedJudgeDetails: Locator = this.page.locator(
    "#case-viewer-field-read--allocatedJudgeDetails",
  );

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Summary" }).click();
  }

  async assertAllocatedJudgeSection(
    isSpecificJudgeOrLegalAdviser: boolean,
    judgeTier: string,
    court: string,
    judgeLastName?: string,
    judgeEmailAddress?: string,
  ): Promise<void> {
    await expect(this.allocatedJudgeLabel).toBeVisible();
    await expect(
      this.allocatedJudgeDetails.getByText("Allocated judge", { exact: true }),
    ).toBeVisible();
    if (isSpecificJudgeOrLegalAdviser) {
      await expect(
        this.allocatedJudgeDetails.getByText("Tier of judge", { exact: true }),
      ).toBeVisible();
    } else {
      await expect(
        this.allocatedJudgeDetails.getByText("Tier of judiciary", {
          exact: true,
        }),
      ).toBeVisible();
    }
    await expect(
      this.allocatedJudgeDetails.getByText(judgeTier, { exact: true }),
    ).toBeVisible();
    await expect(
      this.allocatedJudgeDetails.getByText("Last name", { exact: true }),
    ).toBeVisible();
    if (judgeLastName) {
      await expect(
        this.allocatedJudgeDetails.getByText(judgeLastName, { exact: true }),
      ).toBeVisible();
    }
    await expect(
      this.allocatedJudgeDetails.getByText("Email address", { exact: true }),
    ).toBeVisible();
    if (judgeEmailAddress) {
      await expect(
        this.allocatedJudgeDetails.getByText(judgeEmailAddress, {
          exact: true,
        }),
      ).toBeVisible();
    }
    await expect(
      this.allocatedJudgeDetails.getByText("Court name", { exact: true }),
    ).toBeVisible();
    await expect(
      this.allocatedJudgeDetails.getByText(court, { exact: true }),
    ).toBeVisible();
  }
}
