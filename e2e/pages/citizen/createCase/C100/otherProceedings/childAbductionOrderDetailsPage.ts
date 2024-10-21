import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ChildAbductionOrderDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/childAbductionOrderDetailsContent";
import { OtherProceedingsUniqueSelectors } from "./careOrderOrderDetailsPage";

interface ChildAbductionOrderDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoChildAbductionOrderDetails: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoChildAbductionOrderDetails: boolean;
}

export class ChildAbductionOrderDetailsPage {
  public static async childAbductionOrderDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoChildAbductionOrderDetails: yesNoChildAbductionOrderDetails,
  }: ChildAbductionOrderDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoChildAbductionOrderDetails: yesNoChildAbductionOrderDetails,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${ChildAbductionOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${ChildAbductionOrderDetailsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ChildAbductionOrderDetailsContent,
        "h1",
        `${Selectors.h1}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildAbductionOrderDetailsContent,
        "formLabel",
        `${Selectors.h1}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ChildAbductionOrderDetailsContent.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ChildAbductionOrderDetailsContent.formHint2}")`,
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
        `${Selectors.GovukLabel}:text-is("${ChildAbductionOrderDetailsContent.day}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ChildAbductionOrderDetailsContent.month}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ChildAbductionOrderDetailsContent.year}")`,
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
      ChildAbductionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1month}`,
      ChildAbductionOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1year}`,
      ChildAbductionOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ChildAbductionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ChildAbductionOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ChildAbductionOrderDetailsContent.yearNumber2,
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
        `${Selectors.a}:text-is("${ChildAbductionOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildAbductionOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ChildAbductionOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildAbductionOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoChildAbductionOrderDetails: yesNoChildAbductionOrderDetails,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDetail1}`,
      ChildAbductionOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.caseNo1}`,
      ChildAbductionOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1day}`,
      ChildAbductionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1month}`,
      ChildAbductionOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1year}`,
      ChildAbductionOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ChildAbductionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ChildAbductionOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ChildAbductionOrderDetailsContent.yearNumber2,
    );
    // Selecting 'true' will move onto next page
    if (yesNoChildAbductionOrderDetails) {
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
