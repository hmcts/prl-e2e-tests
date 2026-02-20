import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ConfidentialityCheckConfirmContent } from "../../../../fixtures/manageCases/caseProgression/confidentialityCheck/confidentialityCheckConfirmContent";
import { Helpers } from "../../../../common/helpers";

export class ConfidentialityCheckConfirmPage {
  public static async confidentialityCheckConfirmPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.closeAndReturnToCaseDetails(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(
        `${Selectors.headingH1}:text-is("${ConfidentialityCheckConfirmContent.pageTitle}")`,
      )
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${ConfidentialityCheckConfirmContent.h1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ConfidentialityCheckConfirmContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ConfidentialityCheckConfirmContent.p}")`,
        1,
      ),
    ]);
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
