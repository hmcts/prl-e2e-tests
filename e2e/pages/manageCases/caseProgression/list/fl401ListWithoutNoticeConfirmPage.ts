import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { Fl401ListWithoutNoticeConfirmContent } from "../../../../fixtures/manageCases/caseProgression/List/fl401ListWithoutNoticeConfirmContent.ts";

export class Fl401ListWithoutNoticeConfirmPage {
  public static async fl401ListWithoutNoticeConfirmPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.closeAndReturnToCaseDetails(page);
    await this.checkCaseUpdated(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.h1, {
        hasText: Fl401ListWithoutNoticeConfirmContent.h1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH1}:text-is("${Fl401ListWithoutNoticeConfirmContent.headingH1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${Fl401ListWithoutNoticeConfirmContent.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        Fl401ListWithoutNoticeConfirmContent,
        `p`,
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${Fl401ListWithoutNoticeConfirmContent.closeAndReturnToCaseDetails}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async closeAndReturnToCaseDetails(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${Fl401ListWithoutNoticeConfirmContent.closeAndReturnToCaseDetails}")`,
    );
  }
  private static async checkCaseUpdated(page: Page): Promise<void> {
    await page
      .locator(Selectors.alertMessage, {
        hasText: Fl401ListWithoutNoticeConfirmContent.alertMessage,
      })
      .waitFor();
  }
}
