import { Page } from "@playwright/test";
import { WACaseWorkerActions } from "../../../../common/types.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { AllocatedJudge1Content } from "../../../../fixtures/manageCases/caseProgression/allocatedJudge/allocatedJudge1Content.ts";
import { CommonContent } from "../../../../fixtures/manageCases/commonContent.ts";

interface AllocatedJudge1Options {
  page: Page;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: WACaseWorkerActions;
}

enum UniqueSelectors {
  isSpecificJudge = "#isSpecificJudgeOrLegalAdviserNeeded_Yes",
  selectJudge = "#isJudgeOrLegalAdviser-judge",
  nameOfJudge = "#judgeNameAndEmail",
  judgeName = "mat-option-257",
}

export class AllocatedJudge1Page {
  public static async allocatedJudge1Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
  }: Partial<AllocatedJudge1Options>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${AllocatedJudge1Content.h1}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllocatedJudge1Content.formLabel}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
  }: Partial<AllocatedJudge1Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page.click(UniqueSelectors.isSpecificJudge);
    await page.click(UniqueSelectors.selectJudge);
    await page.fill(`${UniqueSelectors.nameOfJudge}`, CommonContent.judgeName);

    // Wait for the judge option in the dropdown to become visible using dynamic content
    await page.waitForSelector(
      `//mat-option/span[contains(text(), '${CommonContent.judgeName}')]`,
    );

    // Click the option containing the judge name (dynamic value)
    await page.click(
      `//mat-option/span[contains(text(), '${CommonContent.judgeName}')]`,
    );

    await page.waitForSelector(UniqueSelectors.nameOfJudge); // Ensure the name field is filled

    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
