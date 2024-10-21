import { ChildMaintenanceOrderDocumentUploadContent } from "../../../../../../../fixtures/citizen/createCase/C100/otherProceedings/otherProceedings4/childMaintenanceOrder/childMaintenanceOrderDocumentUploadContent";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../../common/selectors";
import { Helpers } from "../../../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../../../common/accessibilityTestHelper";
import config from "../../../../../../../config";
import { CommonStaticText } from "../../../../../../../common/commonStaticText";

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

export class ChildMaintenanceOrderDocumentUploadPage {
  public static async childMaintenanceOrderDocumentUploadPage({
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
      `${Selectors.GovukHeadingXL}:text-is("${ChildMaintenanceOrderDocumentUploadContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ChildMaintenanceOrderDocumentUploadContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ChildMaintenanceOrderDocumentUploadContent.spanA}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ChildMaintenanceOrderDocumentUploadContent.formLabel}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.Span}:text-is("${ChildMaintenanceOrderDocumentUploadContent.spanA}")`,
    );
    await Helpers.checkGroup(
      page,
      5,
      ChildMaintenanceOrderDocumentUploadContent,
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
        `${Selectors.a}:text-is("${ChildMaintenanceOrderDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildMaintenanceOrderDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
    ]);
    let fileInput = page.locator(`${UniqueSelectors.documentUpload}`);
    await fileInput.setInputFiles(config.testOdtFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${ChildMaintenanceOrderDocumentUploadContent.uploadFile}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ChildMaintenanceOrderDocumentUploadContent.errorMessageUploadCorrectFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildMaintenanceOrderDocumentUploadContent.errorMessageUploadCorrectFile}")`,
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
      `${Selectors.GovukButton}:text-is("${ChildMaintenanceOrderDocumentUploadContent.uploadFile}")`,
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
      `${Selectors.a}:text-is("${ChildMaintenanceOrderDocumentUploadContent.remove}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
