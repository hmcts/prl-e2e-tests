import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper";
import { C100ScreeningSectionConsentAgreementContent } from "../../fixtures/c100ScreeningSections/c100ScreeningSectionConsentAgreementContent";
import { Helpers } from "../../common/helpers";

enum uniqueSelectors {
  errorList = ".govuk-list govuk-error-summary__list > li > ",
  radioYes = "#sq_writtenAgreement",
  radioNo = "#sq_writtenAgreement-2",
}

interface C100ScreeningSectionsConsentAgreementPageOptions {
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

export class C100ScreeningSectionConsentAgreementPage {
  public static async c100ScreeningSectionsConsentAgreementPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
  }: C100ScreeningSectionsConsentAgreementPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100ScreeningWrittenAgreementReview
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${C100ScreeningSectionConsentAgreementContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        C100ScreeningSectionConsentAgreementContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        C100ScreeningSectionConsentAgreementContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${C100ScreeningSectionConsentAgreementContent.externalLink}"):`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${C100ScreeningSectionConsentAgreementContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${C100ScreeningSectionConsentAgreementContent.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${C100ScreeningSectionConsentAgreementContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.errorList}${Selectors.a}:text-is("${C100ScreeningSectionConsentAgreementContent.errorSummaryLi}")`,
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
        `${Selectors.GovukLabel}:text-is("${C100ScreeningSectionConsentAgreementContent.consentFormLabel}")`,
        1,
      );
    } else {
      await page.click(uniqueSelectors.radioNo);
    }
    await page.click(
      `${Selectors.button}:text-is("${C100ScreeningSectionConsentAgreementContent.continue}")`,
    );
  }
}
