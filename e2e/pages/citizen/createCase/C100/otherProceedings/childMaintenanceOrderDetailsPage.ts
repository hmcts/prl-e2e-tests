import { ChildMaintenanceOrderDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/childMaintenanceOrderDetailsContent";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CitizensOtherProceedingsUniqueSelectors } from "../../../../../common/enums";

interface ChildMaintenanceOrderDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoChildMaintenanceOrderDetails: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoChildMaintenanceOrderDetails: boolean;
}

export class ChildMaintenanceOrderDetailsPage {
  public static async childMaintenanceOrderDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoChildMaintenanceOrderDetails: yesNoChildMaintenanceOrderDetails,
  }: ChildMaintenanceOrderDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoChildMaintenanceOrderDetails: yesNoChildMaintenanceOrderDetails,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${ChildMaintenanceOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${ChildMaintenanceOrderDetailsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ChildMaintenanceOrderDetailsContent,
        "h1",
        `${Selectors.h1}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildMaintenanceOrderDetailsContent,
        "formLabel",
        `${Selectors.h1}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ChildMaintenanceOrderDetailsContent.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ChildMaintenanceOrderDetailsContent.formHint2}")`,
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
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.day}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.month}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.year}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1day}`,
      ChildMaintenanceOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      ChildMaintenanceOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      ChildMaintenanceOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ChildMaintenanceOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ChildMaintenanceOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ChildMaintenanceOrderDetailsContent.yearNumber2,
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
        `${Selectors.a}:text-is("${ChildMaintenanceOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildMaintenanceOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ChildMaintenanceOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildMaintenanceOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoChildMaintenanceOrderDetails: yesNoChildMaintenanceOrderDetails,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDetail1}`,
      ChildMaintenanceOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.caseNo1}`,
      ChildMaintenanceOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1day}`,
      ChildMaintenanceOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      ChildMaintenanceOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      ChildMaintenanceOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ChildMaintenanceOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ChildMaintenanceOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ChildMaintenanceOrderDetailsContent.yearNumber2,
    );
    // Selecting 'true' will move onto next page
    if (yesNoChildMaintenanceOrderDetails) {
      await page.click(
        `${CitizensOtherProceedingsUniqueSelectors.currentOrderYes}`,
      );
      await page.click(
        `${CitizensOtherProceedingsUniqueSelectors.orderCopyYes}`,
      );
    } else {
      await page.click(
        `${CitizensOtherProceedingsUniqueSelectors.currentOrderNo}`,
      );
      await page.click(
        `${CitizensOtherProceedingsUniqueSelectors.orderCopyNo}`,
      );
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
