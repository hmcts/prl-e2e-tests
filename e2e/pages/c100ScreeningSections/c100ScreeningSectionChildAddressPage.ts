import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper";
import { Selectors } from "../../common/selectors";
import { C100ScreeningSectionChildAddressContent } from "../../fixtures/c100ScreeningSections/c100ScreeningSectionChildAddressContent";
import { Helpers } from "../../common/helpers";

enum uniqueSelectors {
  errorList = ".govuk-list govuk-error-summary__list > li > ",
  childPostcode = "#c100RebuildChildPostCode",
}

interface C100ScreeningSectionsChildAddressPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class C100ScreeningSectionChildAddressPage {
  public static async c100ScreeningSectionsChildAddressPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: C100ScreeningSectionsChildAddressPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${C100ScreeningSectionChildAddressContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:text-is("${C100ScreeningSectionChildAddressContent.bodyL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${C100ScreeningSectionChildAddressContent.bodyM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${C100ScreeningSectionChildAddressContent.strong}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${C100ScreeningSectionChildAddressContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryText}:text-is("${C100ScreeningSectionChildAddressContent.summaryText}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${C100ScreeningSectionChildAddressContent.summaryText}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukDetailsText}:text-is("${C100ScreeningSectionChildAddressContent.detailsText}")`,
      1,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${C100ScreeningSectionChildAddressContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${C100ScreeningSectionChildAddressContent.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${C100ScreeningSectionChildAddressContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.errorList}${Selectors.a}:text-is("${C100ScreeningSectionChildAddressContent.errorSummaryLi}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      `${uniqueSelectors.childPostcode}`,
      `${C100ScreeningSectionChildAddressContent.swanseaPostcode}`,
    );
    await page.click(
      `${Selectors.button}:text-is("${C100ScreeningSectionChildAddressContent.continue}")`,
    );
  }
}
