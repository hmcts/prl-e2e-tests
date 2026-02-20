import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors";
import { HearingCreateEditSummaryContent } from "../../../../fixtures/manageCases/caseProgression/createHearingRequest/hearingCreateEditSummaryContent";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

export class HearingCreateEditSummaryPage {
  public static async hearingCreateEditSummaryPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${HearingCreateEditSummaryContent.govUkHeadingL}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        10,
        HearingCreateEditSummaryContent,
        `GovukHeadingM`,
        Selectors.GovukHeadingM,
      ),
      Helpers.checkGroup(
        page,
        20,
        HearingCreateEditSummaryContent,
        `GovukSummaryListKey`,
        Selectors.GovukSummaryListKey,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CommonStaticText.submitRequest}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.submitRequest}")`,
    );
  }
}
