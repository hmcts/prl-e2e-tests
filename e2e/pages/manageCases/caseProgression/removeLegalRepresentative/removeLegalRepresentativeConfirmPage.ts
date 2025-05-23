import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors.ts";
import { RemoveLegalRepresentativeConfirmContent } from "../../../../fixtures/manageCases/caseProgression/removeLegalRepresentative/removeLegalRepresentativeConfirmContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class RemoveLegalRepresentativeConfirmPage {
  public static async removeLegalRepresentativeConfirmPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.closeAndReturn(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${RemoveLegalRepresentativeConfirmContent.pageTitle}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${RemoveLegalRepresentativeConfirmContent.h1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${RemoveLegalRepresentativeConfirmContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async closeAndReturn(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
    );
  }
}
