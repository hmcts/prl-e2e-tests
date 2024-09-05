import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SelectApplicationType1Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SolicitorCreate2Content } from "../../../../../fixtures/manageCases/createCase/initialJourney/solicitorCreate2Content";
import { solicitorCaseCreateType } from "../../../../../common/types";

enum checkbox {
  yes = "#ordersApplyingFor-childArrangementsOrder",
  no1 = "#ordersApplyingFor-prohibitedStepsOrder",
  no2 = "#ordersApplyingFor-specificIssueOrder",

  spend = "#typeOfChildArrangementsOrder-spendTimeWithOrder",
  live = "#typeOfChildArrangementsOrder-liveWithOrder",
  both = "#typeOfChildArrangementsOrder-bothLiveWithAndSpendTimeWithOrder",
}

export class selectApplicationType1Page {
  public static async selectApplicationType1Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    solicitorCaseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, true);
    await this.childArrangementOrderContent(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.textOnPage1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SelectApplicationType1Content.title}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        SelectApplicationType1Content,
        "fromLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.textOnPage3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SelectApplicationType1Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SelectApplicationType1Content.p2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate2Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SelectApplicationType1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType1Content.errorText1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${SelectApplicationType1Content.errorText2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${SelectApplicationType1Content.errorText3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${SelectApplicationType1Content.errorText1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SelectApplicationType1Content.errorText2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SelectApplicationType1Content.errorText3}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    yesClicked: Boolean,
  ): Promise<void> {
    if (yesClicked) {
      await page.click(checkbox.yes);
      await this.childArrangementOrderContent(page);
      await page.click(checkbox.no1);
      await page.click(checkbox.no2);



    } else {
      await page.click(checkbox.no1);
      await page.click(checkbox.no2);
    }

    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType1Content.continue}")`,
    );
  }

  private static async childArrangementOrderContent(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.textOnPage2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        SelectApplicationType1Content,
        "fromLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
  }
}
