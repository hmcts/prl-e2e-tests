import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { SolicitorCreate5Content } from "../../../../fixtures/manageCases/createCase/initialJourney/solicitorCreate5Content";

enum caseName {
  fieldID = "#applicantOrRespondentCaseName",
}

export class SolicitorCreate5Page {
  public static async solicitorCreate5Page(
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
      `${Selectors.GovukFormHint}:text-is("${SolicitorCreate5Content.formHint1}")`,
    );
    if (isDummyCase) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${SolicitorCreate5Content.dummyPageTitle}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${SolicitorCreate5Content.pageTitle}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${SolicitorCreate5Content.formLabel1}")`,
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
      `${Selectors.button}:text-is("${SolicitorCreate5Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SolicitorCreate5Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${SolicitorCreate5Content.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SolicitorCreate5Content.errorText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<string> {
    const generatedName: string = Helpers.generateCaseName();
    await page.fill(`${caseName.fieldID}`, generatedName);
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate5Content.continue}")`,
    );
    return generatedName;
  }
}
