import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SelectApplicationType1Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

type typeOfOrderID =
  | "Child Arrangements Order"
  | "Prohibited Steps Order"
  | "Specific Issue Order";

type typeOfChildArrangementOrderID =
  | "Spend time with order"
  | "Live with order"
  | "Both live with and spend time with order";

enum PageIDs {
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
    typeOfOrder: typeOfOrderID,
    typeOfChildArrangementOrder?: typeOfChildArrangementOrderID,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, typeOfOrder, typeOfChildArrangementOrder);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.formLabel0}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SelectApplicationType1Content.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SelectApplicationType1Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.formLabel2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.formLabel3}")`,
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
        `${Selectors.GovukErrorSummary}:has-text("${SelectApplicationType1Content.errorMessageOrdersApplyingFor}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${SelectApplicationType1Content.errorMessageOrdersApplyingFor}")`,
        1,
      ),
    ]);

    await page.click(`${PageIDs.childArrangementsOrder}`);
    await page.click(`${PageIDs.prohibitedStepsOrder}`);
    await page.click(`${PageIDs.specificIssueOrder}`);

    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        SelectApplicationType1Content,
        "additionalFormLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:text-is("${SelectApplicationType1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${SelectApplicationType1Content.errorMessageSelectChildArrangementOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${SelectApplicationType1Content.errorMessageSelectChildArrangementOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${SelectApplicationType1Content.errorMessageProvideMoreInfo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${SelectApplicationType1Content.errorMessageProvideMoreInfo}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    typeOfOrder: typeOfOrderID,
    typeOfChildArrangementOrder?: typeOfChildArrangementOrderID,
  ): Promise<void> {
    if (typeOfOrder === "Child Arrangements Order") {
      await page.click(`${PageIDs.childArrangementsOrder}`);
      await this.childArrangementOrderContent(page);
      switch (typeOfChildArrangementOrder) {
        case "Spend time with order":
          await page.click(`${PageIDs.spend}`);
          break;
        case "Live with order":
          await page.click(`${PageIDs.live}`);
          break;
        case "Both live with and spend time with order":
          await page.click(`${PageIDs.both}`);
          break;
      }
      await page.fill(
        `${PageIDs.textarea}`,
        `${SelectApplicationType1Content.loremIpsumText}`,
      );
    } else if (
      typeOfOrder === "Prohibited Steps Order" ||
      typeOfOrder === "Specific Issue Order"
    ) {
      await page.fill(
        `${PageIDs.textarea}`,
        `${SelectApplicationType1Content.loremIpsumText}`,
      );
      this.provideMoreInfoContent(page);
    } else {
      console.error("Invalid order type");
    }
  }

  private static async childArrangementOrderContent(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.additionalFormLabel0}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        SelectApplicationType1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
  }

  private static async provideMoreInfoContent(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.additionalFormLabel4}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SelectApplicationType1Content.p2}")`,
        1,
      ),
    ]);
  }
}
