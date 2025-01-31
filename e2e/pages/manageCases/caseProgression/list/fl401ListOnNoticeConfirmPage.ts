import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Fl401ListOnNoticeConfirmContent } from "../../../../fixtures/manageCases/caseProgression/list/fl401ListOnNoticeConfirmContent";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../common/helpers";

export class Fl401ListOnNoticeConfirmPage {
  public static async fl401ListOnNoticeConfirmPage(
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
        hasText: Fl401ListOnNoticeConfirmContent.h1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH1}:text-is("${Fl401ListOnNoticeConfirmContent.headingH1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${Fl401ListOnNoticeConfirmContent.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        Fl401ListOnNoticeConfirmContent,
        `p`,
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${Fl401ListOnNoticeConfirmContent.closeAndReturnToCaseDetails}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async closeAndReturnToCaseDetails(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${Fl401ListOnNoticeConfirmContent.closeAndReturnToCaseDetails}")`,
    );
  }
  private static async checkCaseUpdated(page: Page): Promise<void> {
    await page
      .locator(Selectors.alertMessage, {
        hasText: Fl401ListOnNoticeConfirmContent.alertMessage,
      })
      .waitFor();
  }
}
