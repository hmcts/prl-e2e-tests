import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ContactOrderForAdoptionOrderDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/contactOrderForAdoptionOrderDetailsContent";
import { CitizensOtherProceedingsUniqueSelectors } from "../../../../../common/enums";

interface ContactOrderForAdoptionOrderDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoContactOrderForAdoptionOrderDetails: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoContactOrderForAdoptionOrderDetails: boolean;
}

export class ContactOrderForAdoptionOrderDetailsPage {
  public static async contactOrderForAdoptionOrderDetailsPageOptions({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoContactOrderForAdoptionOrderDetails:
      yesNoContactOrderForAdoptionOrderDetails,
  }: ContactOrderForAdoptionOrderDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoContactOrderForAdoptionOrderDetails:
        yesNoContactOrderForAdoptionOrderDetails,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${ContactOrderForAdoptionOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${ContactOrderForAdoptionOrderDetailsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ContactOrderForAdoptionOrderDetailsContent,
        "h1",
        `${Selectors.h1}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ContactOrderForAdoptionOrderDetailsContent,
        "formLabel",
        `${Selectors.h1}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ContactOrderForAdoptionOrderDetailsContent.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ContactOrderForAdoptionOrderDetailsContent.formHint2}")`,
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
      ContactOrderForAdoptionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      ContactOrderForAdoptionOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      ContactOrderForAdoptionOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ContactOrderForAdoptionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ContactOrderForAdoptionOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ContactOrderForAdoptionOrderDetailsContent.yearNumber2,
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
        `${Selectors.a}:text-is("${ContactOrderForAdoptionOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ContactOrderForAdoptionOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ContactOrderForAdoptionOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ContactOrderForAdoptionOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoContactOrderForAdoptionOrderDetails:
      yesNoContactOrderForAdoptionOrderDetails,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDetail1}`,
      ContactOrderForAdoptionOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.caseNo1}`,
      ContactOrderForAdoptionOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1day}`,
      ContactOrderForAdoptionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      ContactOrderForAdoptionOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      ContactOrderForAdoptionOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ContactOrderForAdoptionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ContactOrderForAdoptionOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ContactOrderForAdoptionOrderDetailsContent.yearNumber2,
    );
    // Selecting 'true' will move onto next page
    if (yesNoContactOrderForAdoptionOrderDetails) {
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
