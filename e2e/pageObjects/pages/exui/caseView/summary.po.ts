import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";

interface AllocatedJudgeSectionParams {
  isSpecificJudgeOrLegalAdviser: boolean;
  isJudge?: boolean;
  judgeTier?: string;
  courtName: string;
  judgeLastName?: string;
  judgeEmailAddress?: string;
}

export class SummaryPage extends CaseAccessViewPage {
  readonly allocatedJudgeLabel: Locator = this.page.locator(
    "#case-viewer-field-read--allocatedJudgeLabel",
  );
  readonly allocatedJudgeDetails: Locator = this.page.locator(
    "#case-viewer-field-read--allocatedJudgeDetails",
  );
  readonly caseStatusDetails: Locator = this.page.locator(
    "#case-viewer-field-read--caseStatus",
  );

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Summary" }).click();
  }

  async assertAllocatedJudgeSection({
    isSpecificJudgeOrLegalAdviser,
    isJudge,
    judgeTier,
    courtName,
    judgeLastName,
    judgeEmailAddress,
  }: AllocatedJudgeSectionParams): Promise<void> {
    await expect(this.allocatedJudgeLabel).toBeVisible();
    await expect(
      this.allocatedJudgeDetails.getByText("Allocated judge", { exact: true }),
    ).toBeVisible();
    if (isSpecificJudgeOrLegalAdviser && isJudge) {
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
      this.allocatedJudgeDetails.getByText(courtName, { exact: true }),
    ).toBeVisible();
  }

  async assertCaseStatus(status: string): Promise<void> {
    await expect(
      this.caseStatusDetails.getByText("Case status", { exact: true }),
    ).toBeVisible();
    await expect(
      this.caseStatusDetails.getByText(status, { exact: true }),
    ).toBeVisible();
  }

  async assertCaseNameAfterUpdate(newCaseName: string): Promise<void> {
    await expect(this.page.getByRole("tab", { name: "Summary" })).toBeVisible();
    await this.page.getByRole("heading", { name: newCaseName });
  }

  async assertCaseNameAfterUpdateRespondent(
    newCaseNameRespondent: string,
  ): Promise<void> {
    await expect(this.page.getByRole("tab", { name: "Summary" })).toBeVisible();
    await this.page.getByRole("heading", { name: newCaseNameRespondent });
  }
}
