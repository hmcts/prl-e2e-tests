import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
import { CommonStaticText } from "../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../common/helpers.ts";
import { CaseActivatedContent } from "../../fixtures/citizen/caseActivatedContent.ts";

export class CaseActivatedPage {
  public static async caseActivatedPage(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseRef, accessibilityTest);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: CaseActivatedContent.govukHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("Case number ${caseRef}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaseActivatedContent.p}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
