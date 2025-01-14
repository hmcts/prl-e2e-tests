import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { CitizensOtherProceedingsUniqueSelectors } from "../../../../../common/commonUniqueSelectors";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ChildArrangementOrderDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/childArrangementOrderDetailsContent";

interface ChildArrangementOrderDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoOtherProceedings: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoOtherProceedings: boolean;
}

export class ChildArrangementOrderDetailsPage {
  public static async orderDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoOtherProceedings: yesNoOtherProceedings,
  }: ChildArrangementOrderDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      yesNoOtherProceedings: yesNoOtherProceedings,
    });
  }

  private static async checkPageLoads({
    page: page,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${ChildArrangementOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${ChildArrangementOrderDetailsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ChildArrangementOrderDetailsContent,
        "GovukFieldsetLegend",
        `${Selectors.GovukFieldsetLegend}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildArrangementOrderDetailsContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ChildArrangementOrderDetailsContent.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ChildArrangementOrderDetailsContent.formHint2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
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
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page); #TODO Disabled pending PRL-6552 ticket
    // }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1day}`,
      ChildArrangementOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      ChildArrangementOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      ChildArrangementOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ChildArrangementOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ChildArrangementOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ChildArrangementOrderDetailsContent.yearNumber2,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ChildArrangementOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ChildArrangementOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ChildArrangementOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ChildArrangementOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoOtherProceedings: yesNoOtherProceedings,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDetail1}`,
      ChildArrangementOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.caseNo1}`,
      ChildArrangementOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1day}`,
      ChildArrangementOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      ChildArrangementOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      ChildArrangementOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      ChildArrangementOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      ChildArrangementOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      ChildArrangementOrderDetailsContent.yearNumber2,
    );
    // Selecting 'true' will move onto next page
    if (yesNoOtherProceedings) {
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
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
