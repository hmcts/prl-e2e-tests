import { Page } from "@playwright/test";
import { FinancialOrderDetailsContent } from "../../../../../../fixtures/citizen/createCase/C100/otherProceedings/otherProceedings4/financialOrder/financialOrderDetailsContent";
import { Selectors } from "../../../../../../common/selectors";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";

interface FinancialOrderDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoFinancialOrderDetails: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoFinancialOrderDetails: boolean;
}

enum UniqueSelectors {
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

export class FinancialOrderDetailsPage {
  public static async financialOrderDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoFinancialOrderDetails: yesNoFinancialOrderDetails,
  }: FinancialOrderDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoFinancialOrderDetails: yesNoFinancialOrderDetails,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${FinancialOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${FinancialOrderDetailsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        FinancialOrderDetailsContent,
        "h1",
        `${Selectors.h1}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        FinancialOrderDetailsContent,
        "formLabel",
        `${Selectors.h1}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${FinancialOrderDetailsContent.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${FinancialOrderDetailsContent.formHint2}")`,
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
        `${Selectors.GovukLabel}:text-is("${FinancialOrderDetailsContent.day}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${FinancialOrderDetailsContent.month}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${FinancialOrderDetailsContent.year}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.fill(
      `${UniqueSelectors.orderDate1day}`,
      FinancialOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1month}`,
      FinancialOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1year}`,
      FinancialOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1day}`,
      FinancialOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1month}`,
      FinancialOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1year}`,
      FinancialOrderDetailsContent.yearNumber2,
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
        `${Selectors.a}:text-is("${FinancialOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${FinancialOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${FinancialOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${FinancialOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoFinancialOrderDetails: yesNoFinancialOrderDetails,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${UniqueSelectors.orderDetail1}`,
      FinancialOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${UniqueSelectors.caseNo1}`,
      FinancialOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1day}`,
      FinancialOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1month}`,
      FinancialOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1year}`,
      FinancialOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1day}`,
      FinancialOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1month}`,
      FinancialOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1year}`,
      FinancialOrderDetailsContent.yearNumber2,
    );
    // Selecting 'true' will move onto next page
    if (yesNoFinancialOrderDetails) {
      await page.click(`${UniqueSelectors.currentOrderYes}`);
      await page.click(`${UniqueSelectors.orderCopyYes}`);
    } else {
      await page.click(`${UniqueSelectors.currentOrderNo}`);
      await page.click(`${UniqueSelectors.orderCopyNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
