import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { SolicitorCreate7Content } from "../../../../fixtures/manageCases/createCase/initialJourney/solicitorCreate7Content";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../common/commonStaticText";

const submitCountyCourtSelection = "#submitCountyCourtSelection";

export class SolicitorCreate7Page {
  public static async solicitorCreate7Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(`${Selectors.GovukHeadingL}:text-is("${SolicitorCreate7Content.pageTitle}")`);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${SolicitorCreate7Content.h2}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SolicitorCreate7Content.label}")`,
        1
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.selectOption(submitCountyCourtSelection, SolicitorCreate7Content.familyCourt);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
