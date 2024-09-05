import { Page } from "@playwright/test";
import {Selectors} from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";


export class TypeOfApplication2Page {
  public static async typeOfApplication2Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page)
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${TypeOfApplication2Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${TypeOfApplication2Content.familyManHeading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${TypeOfApplication2Content.caseNumberHeading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${TypeOfApplication2Content.}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        TypeOfApplication1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  };

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${TypeOfApplication1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${TypeOfApplication1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${TypeOfApplication1Content.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${TypeOfApplication1Content.errorText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {
    for (let [key, selector] of Object.entries(applicationOrderSelectionIds)) {
      await page.locator(selector).check();
    }

    await page.click(
      `${Selectors.button}:text-is("${TypeOfApplication1Content.continue}")`
    )
  }
}