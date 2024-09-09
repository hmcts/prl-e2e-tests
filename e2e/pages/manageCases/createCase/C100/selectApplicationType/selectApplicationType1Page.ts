import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SelectApplicationType1Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

type typeOfOrderID =
  | "Child Arrangements Order"
  | "Prohibited Steps Order"
  | "Specific Issue Order";

type typeOfChildArrangementOderID =
  | "Spend time with order"
  | "Live with order"
  | "Both live with and spend time with order";

enum checkbox {
  childArrangementsOrder = "#ordersApplyingFor-childArrangementsOrder",
  prohibitedStepsOrder = "#ordersApplyingFor-prohibitedStepsOrder",
  specificIssueOrder = "#ordersApplyingFor-specificIssueOrder",

  spend = "#typeOfChildArrangementsOrder-spendTimeWithOrder",
  live = "#typeOfChildArrangementsOrder-liveWithOrder",
  both = "#typeOfChildArrangementsOrder-bothLiveWithAndSpendTimeWithOrder",

  textarea = "#natureOfOrder",
}

export class selectApplicationType1Page {
  public static async selectApplicationType1Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    // await this.fillInFields(page,  );
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
        "formLabel",
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
      `${Selectors.button}:text-is("${SelectApplicationType1Content.continue}")`,
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
    typeOfOrder: typeOfOrderID,
    typeOfChildArrangementOrder?: typeOfChildArrangementOderID,
  ): Promise<void> {
    //   if (typeOfOrder.includes("Child Arrangements Order")) {
    //     await page.click(checkbox.childArrangementsOrder);
    //     if (typeOfChildArrangementOrder === "Spend time with order") {
    //       await page.click(checkbox.spend);
    //     } else if (typeOfChildArrangementOrder === "Live with order") {
    //       await page.click(checkbox.live);
    //     } else {
    //       await page.click(checkbox.both);
    //     }
    //   } else {
    //     if (typeOfOrder.includes("Prohibited Steps Order")) {
    //       await page.click(checkbox.prohibitedStepsOrder);
    //     }
    //
    //     if (typeOfOrder.includes("Specific Issue Order")) {
    //       await page.click(checkbox.specificIssueOrder);
    //     }
    //   }
    //   await this.fillTextarea(page);
    //   await this.childArrangementOrderContent(page);
  }
  //
  // // const selector: string = caseTypeSelectionIds[solicitorCaseType];
  // // await page.click(selector);
  // // if (solicitorCaseType === "FL401") {
  // // await this.checkFL401(page, errorMessaging);
  // // await page.click(`${caseTypeSelectionIds.yes}`);

  private static async fillTextarea(page: Page): Promise<void> {
    await page.fill(
      `${checkbox.textarea}`,
      `${SelectApplicationType1Content.loremIpsumText}`,
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
