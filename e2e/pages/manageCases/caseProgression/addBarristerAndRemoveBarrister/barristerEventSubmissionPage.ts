import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { BarristerEventSubmissionContent } from "../../../../fixtures/manageCases/caseProgression/addBarristerAndRemoveBarrister/barristerEventSubmissionContent.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface BarristerEventSubmissionPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class BarristerEventSubmissionPage {
    public static async barristerEventSubmissionPage({
    page,
    accessibilityTest,
    }: BarristerEventSubmissionPageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
        page.locator(Selectors.GovukHeadingL, { hasText: BarristerEventSubmissionContent.govUkHeadingL }),
        ).toBeVisible();
    await Helpers.checkGroup(page, 5, BarristerEventSubmissionContent, `span`, `${Selectors.Span}`);
    await Helpers.checkVisibleAndPresent(
            page,
        `${Selectors.Span}:text-is("${BarristerEventSubmissionContent.change}")`,
            5,
    );
    if (accessibilityTest) {
        await new AxeUtils(page).audit();
    }
  }

  private static async continue(page: Page): Promise<void> {
      await page.click(
        `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
      );
    }
}
