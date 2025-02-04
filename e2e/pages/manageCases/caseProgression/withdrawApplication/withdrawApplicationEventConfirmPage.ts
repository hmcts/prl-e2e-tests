import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { WithdrawApplicationEventConfirmContent } from "../../../../fixtures/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventConfirmContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface WithdrawApplicationEventConfirmPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class WithdrawApplicationEventConfirmPage {
  public static async withdrawApplicationEventConfirmPage({
    page,
    accessibilityTest,
  }: WithdrawApplicationEventConfirmPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: WithdrawApplicationEventConfirmPageOptions) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator("#confirmation-header", {
      hasText: "Application withdrawn",
    });
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH1}:text-is("${WithdrawApplicationEventConfirmContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${WithdrawApplicationEventConfirmContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${WithdrawApplicationEventConfirmContent.p}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async saveAndContinue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
    );
  }
}
