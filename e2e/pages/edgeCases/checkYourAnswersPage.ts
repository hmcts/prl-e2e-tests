import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../common/helpers.ts";
import { CheckYourAnswersContent } from "../../fixtures/edgeCases/checkYourAnswersContent.ts";

interface CheckYourAnswersPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class CheckYourAnswersPage {
  public static async checkYourAnswersPage({
    page,
    accessibilityTest,
  }: CheckYourAnswersPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Omit<CheckYourAnswersPageOptions, "additionalDocuments">): Promise<void> {
    const h1Locator = page.locator(
      `${Selectors.h1}:text("${CheckYourAnswersContent.h1}")`,
    );
    await h1Locator.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        CheckYourAnswersContent,
        "h2_",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        9,
        CheckYourAnswersContent,
        "k",
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${CheckYourAnswersContent.changeText}")`,
        10,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CheckYourAnswersContent.p}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
