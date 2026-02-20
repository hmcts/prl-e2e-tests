import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ConfirmationContent } from "../../../../fixtures/citizen/caseView/reasonableAdjustments/confirmationContent";
import { Helpers } from "../../../../common/helpers";

export class ConfirmationPage {
  public static async confirmationPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.closeAndReturnToCaseOverview(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukPanelTitle, {
        hasText: ConfirmationContent.govUkPanelTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ConfirmationContent,
        `govUkHeadingM`,
        `${Selectors.GovukHeadingM}`,
      ),
      Helpers.checkGroup(page, 3, ConfirmationContent, `p`, `${Selectors.p}`),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ConfirmationContent.govUkLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CommonStaticText.closeAndReturnToCaseOverview}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async closeAndReturnToCaseOverview(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.closeAndReturnToCaseOverview}")`,
    );
  }
}
