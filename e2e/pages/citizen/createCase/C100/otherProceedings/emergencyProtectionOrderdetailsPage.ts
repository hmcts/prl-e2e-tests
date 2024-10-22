import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { EmergencyProtectionOrderDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/EmergencyProtectionOrderDetailsContent";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { CitizensOtherProceedingsUniqueSelectors } from "../../../../../common/commonIds";

interface EmergencyProtectionOrderDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoEmergencyProtectionOrderDetails: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoEmergencyProtectionOrderDetails: boolean;
}

export class EmergencyProtectionOrderDetailsPage {
  public static async emergencyProtectionOrderDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoEmergencyProtectionOrderDetails: yesNoEmergencyProtectionOrderDetails,
  }: EmergencyProtectionOrderDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoEmergencyProtectionOrderDetails:
        yesNoEmergencyProtectionOrderDetails,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${EmergencyProtectionOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${EmergencyProtectionOrderDetailsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        EmergencyProtectionOrderDetailsContent,
        "h1",
        `${Selectors.h1}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        EmergencyProtectionOrderDetailsContent,
        "formLabel",
        `${Selectors.h1}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${EmergencyProtectionOrderDetailsContent.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${EmergencyProtectionOrderDetailsContent.formHint2}")`,
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
      EmergencyProtectionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      EmergencyProtectionOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      EmergencyProtectionOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      EmergencyProtectionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      EmergencyProtectionOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      EmergencyProtectionOrderDetailsContent.yearNumber2,
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
        `${Selectors.a}:text-is("${EmergencyProtectionOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${EmergencyProtectionOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${EmergencyProtectionOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${EmergencyProtectionOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoEmergencyProtectionOrderDetails: yesNoEmergencyProtectionOrderDetails,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDetail1}`,
      EmergencyProtectionOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.caseNo1}`,
      EmergencyProtectionOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1day}`,
      EmergencyProtectionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      EmergencyProtectionOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      EmergencyProtectionOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      EmergencyProtectionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      EmergencyProtectionOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      EmergencyProtectionOrderDetailsContent.yearNumber2,
    );
    // Selecting 'true' will move onto next page
    if (yesNoEmergencyProtectionOrderDetails) {
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
