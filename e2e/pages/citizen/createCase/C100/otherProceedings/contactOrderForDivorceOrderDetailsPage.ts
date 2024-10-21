import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ContactOrderForDivorceOrderDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/contactOrderForDivorceOrderDetailsContent";
import { OtherProceedingsUniqueSelectors } from "./careOrderOrderDetailsPage";

interface contactOrderForDivorceOrderDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoContactOrderForDivorceOrderDetails: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoContactOrderForDivorceOrderDetails: boolean;
}

export class ContactOrderForDivorceOrderDetailsPage {
  public static async contactOrderForDivorceOrderDetailsPageOptions({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoContactOrderForDivorceOrderDetails:
      yesNoContactOrderForDivorceOrderDetails,
  }: contactOrderForDivorceOrderDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoContactOrderForDivorceOrderDetails:
        yesNoContactOrderForDivorceOrderDetails,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${ContactOrderForDivorceOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${ContactOrderForDivorceOrderDetailsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ContactOrderForDivorceOrderDetailsContent,
        "h1",
        `${Selectors.h1}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ContactOrderForDivorceOrderDetailsContent,
        "formLabel",
        `${Selectors.h1}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ContactOrderForDivorceOrderDetailsContent.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ContactOrderForDivorceOrderDetailsContent.formHint2}")`,
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
        `${Selectors.GovukLabel}:text-is("${ContactOrderForDivorceOrderDetailsContent.day}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ContactOrderForDivorceOrderDetailsContent.month}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ContactOrderForDivorceOrderDetailsContent.year}")`,
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
      ContactOrderForDivorceOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1month}`,
      ContactOrderForDivorceOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1year}`,
      ContactOrderForDivorceOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ContactOrderForDivorceOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ContactOrderForDivorceOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ContactOrderForDivorceOrderDetailsContent.yearNumber2,
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
        `${Selectors.a}:text-is("${ContactOrderForDivorceOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ContactOrderForDivorceOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ContactOrderForDivorceOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ContactOrderForDivorceOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoContactOrderForDivorceOrderDetails:
      yesNoContactOrderForDivorceOrderDetails,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDetail1}`,
      ContactOrderForDivorceOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.caseNo1}`,
      ContactOrderForDivorceOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1day}`,
      ContactOrderForDivorceOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1month}`,
      ContactOrderForDivorceOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderDate1year}`,
      ContactOrderForDivorceOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ContactOrderForDivorceOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ContactOrderForDivorceOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${OtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ContactOrderForDivorceOrderDetailsContent.yearNumber2,
    );
    // Selecting 'true' will move onto next page
    if (yesNoContactOrderForDivorceOrderDetails) {
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
