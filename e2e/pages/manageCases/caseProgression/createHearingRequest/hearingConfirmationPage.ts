import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors.ts";
import { HearingConfirmationContent } from "../../../../fixtures/manageCases/caseProgression/createHearingRequest/hearingConfirmationContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class HearingConfirmationPage {
  public static async hearingConfirmationPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.viewHearingStatus(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukPanelTitle}`, {
        hasText: `${HearingConfirmationContent.govUkPanelTitle}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukPanelBody}:text-is("${HearingConfirmationContent.govUkPanelBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${HearingConfirmationContent.govUkHeadingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${HearingConfirmationContent.govUkBody1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${HearingConfirmationContent.govUkBody2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async viewHearingStatus(page: Page): Promise<void> {
    await page
      .getByRole("link", {
        name: "view the status of this hearing in the hearings tab",
      })
      .click();
  }
}
