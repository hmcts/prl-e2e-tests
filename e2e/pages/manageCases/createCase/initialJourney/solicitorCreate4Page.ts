import { Page } from "@playwright/test";
import { SolicitorCreate4Content } from "../../../../fixtures/manageCases/createCase/initialJourney/solicitorCreate4Content";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";

enum caseName {
  fieldID = "#applicantCaseName",
}

export class SolicitorCreate4Page {
  public static async solicitorCreate4Page(
    page: Page,
    isDummyCase: boolean,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<string> {
    await this.checkPageLoads(page, isDummyCase, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    return await this.fillInFields(page);
  }
  private static async checkPageLoads(
    page: Page,
    isDummyCase: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormHint}:text-is("${SolicitorCreate4Content.formHint1}")`,
    );
    if (isDummyCase) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${SolicitorCreate4Content.dummyPageTitle}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${SolicitorCreate4Content.pageTitle}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          2,
          SolicitorCreate4Content,
          "p",
          `${Selectors.p}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${SolicitorCreate4Content.formLabel1}")`,
          1,
        ),
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate4Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SolicitorCreate4Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${SolicitorCreate4Content.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SolicitorCreate4Content.errorText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<string> {
    const generatedName: string = Helpers.generateCaseName();
    await page.fill(`${caseName.fieldID}`, generatedName);
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate4Content.continue}")`,
    );
    return generatedName;
  }
}
