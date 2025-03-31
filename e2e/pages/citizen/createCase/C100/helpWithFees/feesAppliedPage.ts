import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { FeesAppliedContent } from "../../../../../fixtures/citizen/createCase/C100/helpWithFees/feesAppliedContent";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

enum inputIDs {
  radioYes = "#hwf_feesAppliedDetails",
  radioNo = "#hwf_feesAppliedDetails-2",
  referenceNumber = "#helpWithFeesReferenceNumber",
}

interface FeesAppliedPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100YesNoFeesApplied: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  c100YesNoFeesApplied: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class FeesAppliedPage {
  public static async feesAppliedPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100YesNoFeesApplied,
  }: FeesAppliedPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      c100YesNoFeesApplied: c100YesNoFeesApplied,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${FeesAppliedContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page, [inputIDs.radioYes]); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${FeesAppliedContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${FeesAppliedContent.errorMessage}")`,
        1,
      ),
    ]);
    await this.checkNestedErrors(page);
  }

  private static async checkNestedErrors(page: Page): Promise<void> {
    await page.click(inputIDs.radioYes);
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${FeesAppliedContent.referenceErrorList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${FeesAppliedContent.referenceErrorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100YesNoFeesApplied,
  }: FillInFieldsOptions): Promise<void> {
    if (c100YesNoFeesApplied) {
      await page.click(inputIDs.radioYes);
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:text-is("${FeesAppliedContent.label}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukBody}:text-is("${FeesAppliedContent.body}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHint}:text-is("${FeesAppliedContent.formHint}")`,
          1,
        ),
      ]);
      await page.fill(
        inputIDs.referenceNumber,
        FeesAppliedContent.referenceNumber,
      );
    } else {
      await page.click(inputIDs.radioNo);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
