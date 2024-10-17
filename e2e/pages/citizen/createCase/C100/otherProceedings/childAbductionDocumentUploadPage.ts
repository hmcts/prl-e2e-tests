import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import config from "../../../../../config";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ChildAbductionDocumentUploadContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/childAbductionDocumentUploadContent";

interface ChildAbductionDocumentUploadPageOptions {
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

export class ChildAbductionDocumentUploadPage {
  public static async childAbductionDocumentUploadPageOptions({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: ChildAbductionDocumentUploadPageOptions): Promise<void> {
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
      `${Selectors.GovukHeadingXL}:text-is("${ChildAbductionDocumentUploadContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ChildAbductionDocumentUploadContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ChildAbductionDocumentUploadContent.spanA}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ChildAbductionDocumentUploadContent.formLabel}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.Span}:text-is("${ChildAbductionDocumentUploadContent.spanA}")`,
    );
    await Helpers.checkGroup(
      page,
      5,
      ChildAbductionDocumentUploadContent,
      "li",
      `${Selectors.li}`,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
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
        `${Selectors.a}:text-is("${ChildAbductionDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildAbductionDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
    ]);
    let fileInput = page.locator(`${UniqueSelectors.documentUpload}`);
    await fileInput.setInputFiles(config.testOdtFile);

    // # Not sure if you need to press the button
    // await page.click(
    //   `${Selectors.button}:text-is("${ChildAbductionDocumentUploadContent.uploadFile}")`,
    // );

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ChildAbductionDocumentUploadContent.errorMessageUploadCorrectFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildAbductionDocumentUploadContent.errorMessageUploadCorrectFile}")`,
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
      `${Selectors.button}:text-is("${ChildAbductionDocumentUploadContent.uploadFile}")`,
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
      `${Selectors.a}:text-is("${ChildAbductionDocumentUploadContent.remove}")`,
      1,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
