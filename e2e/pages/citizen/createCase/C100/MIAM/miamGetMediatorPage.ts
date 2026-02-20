import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamGetMediatorContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamGetMediatorContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";

interface MiamGetMediatorPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class MiamGetMediatorPage {
  public static async miamGetMediatorPage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: MiamGetMediatorPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: MiamGetMediatorPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${MiamGetMediatorContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:text-is("${MiamGetMediatorContent.govukBodyL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${MiamGetMediatorContent.govukHeadingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${MiamGetMediatorContent.govukBodyM1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${MiamGetMediatorContent.govukLabel}")`,
        1,
      ),
      Helpers.checkGroup(page, 3, MiamGetMediatorContent, `li`, Selectors.li),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:has-text("${MiamGetMediatorContent.govukBodyM2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:has-text("${MiamGetMediatorContent.button}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
