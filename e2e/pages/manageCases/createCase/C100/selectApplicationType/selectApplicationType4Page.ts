import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
// import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SelectApplicationType4Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType4Content";

enum PageIDs {
  textbox = "#applicationDetails",
}

export class selectApplicationType4Page {
  public static async selectApplicationType4Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page);
  }

  // @ts-ignore
  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${SelectApplicationType4Content.p1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SelectApplicationType4Content.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SelectApplicationType4Content.p2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${SelectApplicationType4Content.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        SelectApplicationType4Content,
        "li",
        `${Selectors.li}`,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType4Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SelectApplicationType4Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType4Content.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SelectApplicationType4Content.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      `${PageIDs.textbox}`,
      `${SelectApplicationType4Content.loremIpsumText}`,
    );

    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType4Content.continue}")`,
    );
  }
}
