import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { CitizensOtherProceedingsUniqueSelectors } from "../../../../../common/commonUniqueSelectors";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { OccupationOrderDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/occupationOrderDetailsContent";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface OccupationOrderDetailsPageOptions {
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

export class OccupationOrderDetailsPage {
  public static async occupationOrderDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoOtherProceedings: yesNoOtherProceedings,
  }: OccupationOrderDetailsPageOptions): Promise<void> {
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
    accessibilityTest: accessibilityTest
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${OccupationOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${OccupationOrderDetailsContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        OccupationOrderDetailsContent,
        "GovukFieldsetLegend",
        `${Selectors.GovukFieldsetLegend}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        OccupationOrderDetailsContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${OccupationOrderDetailsContent.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${OccupationOrderDetailsContent.formHint2}")`,
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
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1day}`,
      OccupationOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      OccupationOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      OccupationOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      OccupationOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      OccupationOrderDetailsContent.errorMonthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      OccupationOrderDetailsContent.yearNumber2,
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
        `${Selectors.a}:text-is("${OccupationOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OccupationOrderDetailsContent.errorMessageOrderDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${OccupationOrderDetailsContent.errorMessageOrderEndDate}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OccupationOrderDetailsContent.errorMessageOrderEndDate}")`,
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
      OccupationOrderDetailsContent.courtIssued,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.caseNo1}`,
      OccupationOrderDetailsContent.caseNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1day}`,
      OccupationOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1month}`,
      OccupationOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderDate1year}`,
      OccupationOrderDetailsContent.yearNumber1,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1day}`,
      OccupationOrderDetailsContent.dayNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1month}`,
      OccupationOrderDetailsContent.monthNumber,
    );
    await page.fill(
      `${CitizensOtherProceedingsUniqueSelectors.orderEndDate1year}`,
      OccupationOrderDetailsContent.yearNumber2,
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
