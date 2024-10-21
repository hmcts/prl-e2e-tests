import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { CareOrderDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/careOrderDetailsContent";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface CareOrderDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoCareOrderOrderDetails: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoCareOrderOrderDetails: boolean;
}

export enum OtherProceedingsUniqueSelectors {
  orderDetail1 = "#orderDetail-1",
  caseNo1 = "#caseNo-1",
  orderDate1day = "#orderDate-1-day",
  orderDate1month = "#orderDate-1-month",
  orderDate1year = "#orderDate-1-year",
  currentOrderYes = "#currentOrder-1",
  currentOrderNo = "#currentOrder-1-2",
  orderEndDate1day = "#orderEndDate-1-day",
  orderEndDate1month = "#orderEndDate-1-month",
  orderEndDate1year = "#orderEndDate-1-year",
  orderCopyYes = "#orderCopy-1",
  orderCopyNo = "#orderCopy-1-2",
}

export class CareOrderDetailsPage {
  public static async careOrderDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoCareOrderOrderDetails: yesNoCareOrderOrderDetails,
  }: CareOrderDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoCareOrderOrderDetails: yesNoCareOrderOrderDetails,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${CareOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${CareOrderDetailsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        CareOrderDetailsContent,
        "h1",
        `${Selectors.h1}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        CareOrderDetailsContent,
        "formLabel",
        `${Selectors.h1}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${CareOrderDetailsContent.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${CareOrderDetailsContent.formHint2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${CommonStaticText.strippedYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${CommonStaticText.strippedNo}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CareOrderDetailsContent.day}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CareOrderDetailsContent.month}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CareOrderDetailsContent.year}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1day}`,
      CareOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1month}`,
      CareOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1year}`,
      CareOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1day}`,
      CareOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1month}`,
      CareOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1year}`,
      CareOrderDetailsContent.yearNumber2,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${CareOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${CareOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${CareOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${CareOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoCareOrderOrderDetails: yesNoCareOrderOrderDetails,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDetail1}`,
      CareOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.caseNo1}`,
      CareOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1day}`,
      CareOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1month}`,
      CareOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1year}`,
      CareOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1day}`,
      CareOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1month}`,
      CareOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1year}`,
      CareOrderDetailsContent.yearNumber2,
    );
    // Selecting 'true' will move onto next page
    if (yesNoCareOrderOrderDetails) {
      await page.click(`${OtherProceedingsUniqueSelectors.currentOrderYes}`);
      await page.click(`${OtherProceedingsUniqueSelectors.orderCopyYes}`);
    } else {
      await page.click(`${OtherProceedingsUniqueSelectors.currentOrderNo}`);
      await page.click(`${OtherProceedingsUniqueSelectors.orderCopyNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
