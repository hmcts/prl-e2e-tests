import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers";
import { Selectors } from "../../../../common/selectors";
import { solicitorCaseCreateType } from "../../../../common/types";
import { SolicitorCreate2Content } from "../../../../fixtures/manageCases/createCase/initialJourney/solicitorCreate2Content";

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
    isDummyCase: boolean = false,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest, isDummyCase);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(
      page,
      solicitorCaseType,
      errorMessaging,
      isDummyCase,
    );
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    isDummyCase: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${SolicitorCreate2Content.subTitle}")`,
    );
    if (isDummyCase) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SolicitorCreate2Content.dummyPageTitle}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SolicitorCreate2Content.title}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${SolicitorCreate2Content.h3Label}")`,
        1,
      );
    }
    await Promise.all([
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
      await new AxeUtils(page).audit();
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
    isDummyCase: boolean,
  ): Promise<void> {
    const selector: string = caseTypeSelectionIds[solicitorCaseType];
    await page.click(selector);
    if (!isDummyCase && solicitorCaseType === "FL401") {
      await this.checkFL401(page, errorMessaging);
      await page.click(`${caseTypeSelectionIds.yes}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate2Content.continue}")`,
    );
  }
}
