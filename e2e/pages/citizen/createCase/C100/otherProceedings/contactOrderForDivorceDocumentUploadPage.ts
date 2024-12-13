import { expect, Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { CitizenOtherProceedingsDocumentUploadSelectors } from "../../../../../common/commonUniqueSelectors";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import config from "../../../../../config";
import { ContactOrderForDivorceDocumentUploadContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/contactOrderForDivorceDocumentUploadContent";

interface ContactOrderForDivorceDocumentUploadPageOptions {
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

export class ContactOrderForDivorceDocumentUploadPage {
  public static async contactOrderForDivorceDocumentUploadPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: ContactOrderForDivorceDocumentUploadPageOptions): Promise<void> {
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
      `${Selectors.GovukHeadingXL}:text-is("${ContactOrderForDivorceDocumentUploadContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ContactOrderForDivorceDocumentUploadContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ContactOrderForDivorceDocumentUploadContent.spanA}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.uploadAFile}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.Span}:text-is("${ContactOrderForDivorceDocumentUploadContent.spanA}")`,
    );
    await Helpers.checkGroup(
      page,
      5,
      ContactOrderForDivorceDocumentUploadContent,
      "li",
      `${Selectors.li}`,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
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
        `${Selectors.a}:text-is("${ContactOrderForDivorceDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ContactOrderForDivorceDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
    ]);
    const fileInput = page.locator(
      `${CitizenOtherProceedingsDocumentUploadSelectors.documentUpload}`,
    );
    await fileInput.setInputFiles(config.testOdtFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.uploadFile}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${ContactOrderForDivorceDocumentUploadContent.errorMessageUploadCorrectFile}")`,
      1,
    );
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    const fileInput = page.locator(
      `${CitizenOtherProceedingsDocumentUploadSelectors.documentUpload}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.uploadFile}")`,
    );
    await page.waitForSelector(
      `${CitizenOtherProceedingsDocumentUploadSelectors.uploadConfirmationSelector}`,
      { timeout: 5000 },
    );
    const isUploaded = page.locator(
      `${CitizenOtherProceedingsDocumentUploadSelectors.uploadConfirmationSelector}`,
    );
    await expect(isUploaded).toBeVisible();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${CommonStaticText.remove}")`,
      1,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
