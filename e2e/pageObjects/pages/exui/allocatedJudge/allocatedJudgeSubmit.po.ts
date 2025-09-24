import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { CheckYourAnswersTableComponent } from "../../../components/exui/checkYourAnswersTable.component.js";

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
  readonly submitButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.submit,
  });
  readonly previousButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.previous,
  });
  readonly checkYourAnswersTable: CheckYourAnswersTableComponent =
    new CheckYourAnswersTableComponent(this.page);

  constructor(page: Page) {
    super(page, "Allocated judge");
  }

  async assertPageContents({
    isSpecificJudgeOrLegalAdviser,
    isJudge,
    judgeTier,
  }: AllocatedJudgeSubmitParams): Promise<void> {
    await this.checkPageHeadings();
    await expect(this.headingH2).toBeVisible();
    await expect(this.tex16).toBeVisible();
    const fileName = this.buildSnapshotFileName({
      isSpecificJudgeOrLegalAdviser,
      isJudge,
      judgeTier,
    });
    await this.checkYourAnswersTable.runVisualTest([
      "caseProgression",
      "allocatedJudge",
      `${fileName}.png`,
    ]);
    await expect(this.submitButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
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
