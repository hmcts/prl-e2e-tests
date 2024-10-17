import { Selectors } from "../../../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../../common/commonStaticText";
import { ContactOrderForAdoptionOrderDetailsContent } from "../../../../../../../fixtures/citizen/createCase/C100/otherProceedings/otherProceedings3/contactOrderForAdoption/contactOrderForAdoptionOrderDetailsContent";

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
        `${Selectors.GovukLabel}:text-is("${ContactOrderForAdoptionOrderDetailsContent.day}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ContactOrderForAdoptionOrderDetailsContent.month}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ContactOrderForAdoptionOrderDetailsContent.year}")`,
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
      ContactOrderForAdoptionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1month}`,
      ContactOrderForAdoptionOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1year}`,
      ContactOrderForAdoptionOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1day}`,
      ContactOrderForAdoptionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1month}`,
      ContactOrderForAdoptionOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1year}`,
      ContactOrderForAdoptionOrderDetailsContent.yearNumber2,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.paddedContinue}")`,
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
      `${UniqueSelectors.orderDetail1}`,
      ContactOrderForAdoptionOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${UniqueSelectors.caseNo1}`,
      ContactOrderForAdoptionOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1day}`,
      ContactOrderForAdoptionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1month}`,
      ContactOrderForAdoptionOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderDate1year}`,
      ContactOrderForAdoptionOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1day}`,
      ContactOrderForAdoptionOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1month}`,
      ContactOrderForAdoptionOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${UniqueSelectors.orderEndDate1year}`,
      ContactOrderForAdoptionOrderDetailsContent.yearNumber2,
    );
    // Selecting 'true' will move onto next page
    if (yesNoContactOrderForAdoptionOrderDetails) {
      await page.click(`${UniqueSelectors.currentOrderYes}`);
      await page.click(`${UniqueSelectors.orderCopyYes}`);
    } else {
      await page.click(`${UniqueSelectors.currentOrderNo}`);
      await page.click(`${UniqueSelectors.orderCopyNo}`);
    }
  }
}
