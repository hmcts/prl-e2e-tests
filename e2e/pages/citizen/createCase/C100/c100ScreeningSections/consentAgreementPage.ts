import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ConsentAgreementContent } from "../../../../../fixtures/citizen/createCase/C100/c100ScreeningSections/consentAgreementContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

enum uniqueSelectors {
  errorList = ".govuk-list govuk-error-summary__list > li > ",
  radioYes = "#sq_writtenAgreement",
  radioNo = "#sq_writtenAgreement-2",
}

interface ConsentAgreementPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100ScreeningWrittenAgreementReview: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ConsentAgreementPage {
  public static async consentAgreementPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
  }: ConsentAgreementPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100ScreeningWrittenAgreementReview,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ConsentAgreementContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ConsentAgreementContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.paddedYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.paddedYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ConsentAgreementContent.externalLink}"):`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.paddedContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ConsentAgreementContent.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ConsentAgreementContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.errorList}${Selectors.a}:text-is("${ConsentAgreementContent.errorSummaryLi}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100ScreeningWrittenAgreementReview,
  }: FillInFieldsOptions): Promise<void> {
    if (c100ScreeningWrittenAgreementReview) {
      await page.click(uniqueSelectors.radioYes);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ConsentAgreementContent.consentFormLabel}")`,
        1,
      );
    } else {
      await page.click(uniqueSelectors.radioNo);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
