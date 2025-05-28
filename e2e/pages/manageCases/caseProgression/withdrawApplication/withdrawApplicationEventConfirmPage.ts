import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { WithdrawApplicationEventConfirmContent } from "../../../../fixtures/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventConfirmContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface WithdrawApplicationEventConfirmPageOptions {
  page: Page;
  accessibilityTest?: boolean;
  withdrawApplication: boolean;
}

export class WithdrawApplicationEventConfirmPage {
  public static async withdrawApplicationEventConfirmPage({
    page,
    accessibilityTest,
    withdrawApplication,
  }: WithdrawApplicationEventConfirmPageOptions): Promise<void> {
    await this.checkPageContent({
      page,
      accessibilityTest,
      withdrawApplication,
    });
    await this.closeAndReturnToCaseDetails(page);
  }

  private static async checkPageContent({
    page,
    accessibilityTest,
    withdrawApplication,
  }: WithdrawApplicationEventConfirmPageOptions): Promise<void> {
    if (!page) throw new Error("No page found");

    const confirmationHeader = page.locator("#confirmation-header", {
      hasText: withdrawApplication
        ? WithdrawApplicationEventConfirmContent.text
        : WithdrawApplicationEventConfirmContent.text2,
    });

    await confirmationHeader.waitFor();

    if (withdrawApplication) {
      await Promise.all([
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
    }

    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.headingH1}:text-is("${WithdrawApplicationEventConfirmContent.govUkHeadingL}")`,
      1,
    );

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async closeAndReturnToCaseDetails(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
    );
  }
}
