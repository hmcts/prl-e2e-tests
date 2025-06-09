import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { WithdrawApplicationEventSubmitContent } from "../../../../fixtures/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventSubmitContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface WithdrawApplicationEventSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  withdrawApplication: boolean;
}

export class WithdrawApplicationEventSubmitPage {
  public static async withdrawApplicationEventSubmitPage({
    page,
    accessibilityTest,
    withdrawApplication,
  }: WithdrawApplicationEventSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest, withdrawApplication });
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    withdrawApplication,
  }: WithdrawApplicationEventSubmitPageOptions) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h2}:text-is("${WithdrawApplicationEventSubmitContent.h2}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${WithdrawApplicationEventSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${WithdrawApplicationEventSubmitContent.text16_1}")`,
        1,
      ),
    ]);
    if (withdrawApplication) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${WithdrawApplicationEventSubmitContent.text16_1}")`,
          1,
        ),
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.yes}")`,
          1,
        ),
      ]);
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${CommonStaticText.no}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async saveAndContinue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
