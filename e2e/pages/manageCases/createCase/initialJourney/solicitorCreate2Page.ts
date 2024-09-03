import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { SolicitorCreate2Content } from "../../../../fixtures/manageCases/createCase/initialJourney/solicitorCreate2Content";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { solicitorCaseCreateType } from "../../../../common/types";

enum caseTypeSelectionIds {
  C100 = "#caseTypeOfApplication-C100",
  FL401 = "#caseTypeOfApplication-FL401",
  yes = "#caseFromCourtNav_Yes",
}

export class SolicitorCreate2Page {
  public static async solicitorCreate2Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    solicitorCaseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, solicitorCaseType, errorMessaging);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${SolicitorCreate2Content.subTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SolicitorCreate2Content.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SolicitorCreate2Content.textOnPage}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        SolicitorCreate2Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SolicitorCreate2Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${SolicitorCreate2Content.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SolicitorCreate2Content.errorText}")`,
        1,
      ),
    ]);
  }

  private static async checkFL401(
    page: Page,
    errorMessaging: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SolicitorCreate2Content.formLabel4011}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${SolicitorCreate2Content.formHint}")`,
        1,
      ),
    ]);
    if (errorMessaging) {
      await this.checkErrorMessagingFL401(page);
    }
  }

  private static async checkErrorMessagingFL401(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SolicitorCreate2Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${SolicitorCreate2Content.errorFL401}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SolicitorCreate2Content.errorFL401}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    solicitorCaseType: solicitorCaseCreateType,
    errorMessaging: boolean,
  ): Promise<void> {
    const selector: string = caseTypeSelectionIds[solicitorCaseType];
    await page.click(selector);
    if (solicitorCaseType === "FL401") {
      await this.checkFL401(page, errorMessaging);
      await page.click(`${caseTypeSelectionIds.yes}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate2Content.continue}")`,
    );
  }
}
