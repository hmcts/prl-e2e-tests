import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { ExuiMediaViewerPage } from "../exuiMediaViewer.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

interface AllocatedJudgeSubmitParams {
  isSpecificJudgeOrLegalAdviser: boolean;
  isJudge?: boolean;
  judgeTier?: string;
}

export class AllocatedJudgeSubmitPage extends EventPage {
  readonly headingH2: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Check your answers",
  });
  readonly tex16: Locator = this.page.locator(Selectors.GovukText16, {
    hasText: "Check the information below carefully.",
  });
  readonly h2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Allocated judge",
  });
  readonly exuiMediaViewer: ExuiMediaViewerPage = new ExuiMediaViewerPage(
    this.page,
  );
  readonly submitButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.submit,
  });

  constructor(page: Page) {
    super(page, "Allocated judge");
  }

  async checkPageContents({
    isSpecificJudgeOrLegalAdviser,
    isJudge,
    judgeTier,
  }: AllocatedJudgeSubmitParams): Promise<void> {
    await this.checkHeading();
    await expect(this.headingH2).toBeVisible();
    await expect(this.tex16).toBeVisible();
    await expect(this.h2).toBeVisible();
    const fileName = this.buildSnapshotFileName({
      isSpecificJudgeOrLegalAdviser,
      isJudge,
      judgeTier,
    });
    // snapshot cya page for easier comparison
    await this.exuiMediaViewer.runVisualTestOnCyaPage(fileName);
  }

  private buildSnapshotFileName({
    isSpecificJudgeOrLegalAdviser,
    isJudge,
    judgeTier,
  }: AllocatedJudgeSubmitParams): string {
    let fileName: string = "allocated-judge-cya";
    if (isSpecificJudgeOrLegalAdviser) {
      if (isJudge) {
        fileName += "-specific-judge";
      } else {
        fileName += "-specific-legal-adviser";
      }
    } else {
      const formattedJudgeTier: string = judgeTier
        .replace(/ /g, "-")
        .toLowerCase();
      fileName += `-${formattedJudgeTier}`;
    }
    return fileName;
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }
}
