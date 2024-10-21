import { Page } from "@playwright/test";
import { FinancialOrderDocumentUploadContent } from "../../../../../../fixtures/citizen/createCase/C100/otherProceedings/otherProceedings4/financialOrder/financialOrderDocumentUploadContent";
import { Selectors } from "../../../../../../common/selectors";
import { Helpers } from "../../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import config from "../../../../../../config";

interface childMaintenanceOrderDocumentUploadPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

enum UniqueSelectors {
  documentUpload = "#document",
  uploadConfirmationSelector = ".govuk-summary-list__value",
}

export class FinancialOrderDocumentUploadPage {
  public static async financialOrderDocumentUploadPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: childMaintenanceOrderDocumentUploadPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${FinancialOrderDocumentUploadContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        FinancialOrderDocumentUploadContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${FinancialOrderDocumentUploadContent.spanA}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${FinancialOrderDocumentUploadContent.formLabel}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.Span}:text-is("${FinancialOrderDocumentUploadContent.spanA}")`,
    );
    await Helpers.checkGroup(
      page,
      5,
      FinancialOrderDocumentUploadContent,
      "li",
      `${Selectors.li}`,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
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
        `${Selectors.a}:text-is("${FinancialOrderDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${FinancialOrderDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
    ]);
    let fileInput = page.locator(`${UniqueSelectors.documentUpload}`);
    await fileInput.setInputFiles(config.testOdtFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${FinancialOrderDocumentUploadContent.uploadFile}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${FinancialOrderDocumentUploadContent.errorMessageUploadCorrectFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${FinancialOrderDocumentUploadContent.errorMessageUploadCorrectFile}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    let fileInput = page.locator(`${UniqueSelectors.documentUpload}`);
    await fileInput.setInputFiles(config.testPdfFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${FinancialOrderDocumentUploadContent.uploadFile}")`,
    );
    await page.waitForSelector(
      `${UniqueSelectors.uploadConfirmationSelector}`,
      { timeout: 5000 },
    );
    const isUploaded = await page.isVisible(
      `${UniqueSelectors.uploadConfirmationSelector}`,
    );
    expect(isUploaded).toBeTruthy();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${FinancialOrderDocumentUploadContent.remove}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
