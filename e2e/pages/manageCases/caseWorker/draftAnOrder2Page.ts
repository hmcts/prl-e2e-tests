import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { Helpers } from "../../../common/helpers";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";
import { DraftAnOrder2Content } from "../../../fixtures/manageCases/caseWorker/draftAnOrder2Content";
import { OrderType, solicitorCaseCreateType } from "../../../common/types";

enum UniqueSelectors {
  errorMessageSelector = "ccd-callback-errors > div > ul > li",
}

const nonDraftableOrders: OrderType[] = [
  "standardDirectionsOrder",
  "directionOnIssue",
  "noticeOfProceedingsParties",
  "noticeOfProceedingsNonParties",
  "noticeOfProceedings",
];

const invalidC100OrderTypes: OrderType[] = [
  "nonMolestation",
  "occupation",
  "powerOfArrest",
  "amendDischargedVaried",
  "blank",
  "generalForm",
  ...nonDraftableOrders,
];

const invalidFL401OrderTypes: OrderType[] = [
  "blankOrderOrDirections",
  "childArrangementsSpecificProhibitedOrder",
  "parentalResponsibility",
  "specialGuardianShip",
  "appointmentOfGuardian",
  ...nonDraftableOrders,
];

export class DraftAnOrder2Page {
  public static async draftAnOrder2Page(
    page: Page,
    caseType: solicitorCaseCreateType,
    orderType: OrderType,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page, caseType);
    }
    await this.fillInFields(page, orderType);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukInsetText}:text-is("${DraftAnOrder2Content.insetText}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${DraftAnOrder2Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        17,
        DraftAnOrder2Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder2Content.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder2Content.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.continue(page);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${DraftAnOrder2Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${DraftAnOrder2Content.errorMessageSelectTheTypeOfOrderIsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${DraftAnOrder2Content.errorMessageSelectTheTypeOfOrderIsRequired}")`,
        1,
      ),
    ]);
    if ("C100" === caseType) {
      await this.checkC100ErrorMessaging(page);
    } else {
      await this.checkFL401ErrorMessaging(page);
    }
  }

  private static async checkC100ErrorMessaging(page: Page): Promise<void> {
    for (const orderType of invalidC100OrderTypes) {
      await this.fillInFields(page, orderType);
      await this.continue(page);
      if (nonDraftableOrders.includes(orderType)) {
        await Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.errorMessageSelector}:text-is("${DraftAnOrder2Content.errorMessageOrderNotAvailableToBeDrafted}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.errorMessageSelector}:text-is("${DraftAnOrder2Content.errorMessageOrderNotAvailableForC100}")`,
          1,
        );
      }
    }
  }

  private static async checkFL401ErrorMessaging(page: Page): Promise<void> {
    for (const orderType of invalidFL401OrderTypes) {
      await this.fillInFields(page, orderType);
      await this.continue(page);
      if (nonDraftableOrders.includes(orderType)) {
        await Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.errorMessageSelector}:text-is("${DraftAnOrder2Content.errorMessageOrderNotAvailableToBeDrafted}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.errorMessageSelector}:text-is("${DraftAnOrder2Content.errorMessageOrderNotAvailableForFL401}")`,
          1,
        );
      }
    }
  }

  private static async fillInFields(
    page: Page,
    orderType: OrderType,
  ): Promise<void> {
    await page.check(`#createSelectOrderOptions-${orderType}`);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder2Content.continue}")`,
    );
  }
}
