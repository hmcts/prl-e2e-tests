import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { expect, Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import config from "../../../../../config";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ContactOrderForAdoptionDocumentUploadContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/contactOrderForAdoptionDocumentUploadContent";
import { CitizenOtherProceedingsDocumentUploadSelectors } from "../../../../../common/commonUniqueSelectors";

interface ContactOrderForAdoptionDocumentUploadPageOptions {
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

export class ContactOrderForAdoptionDocumentUploadPage {
  public static async contactOrderForAdoptionDocumentUploadPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: ContactOrderForAdoptionDocumentUploadPageOptions): Promise<void> {
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
      `${Selectors.GovukHeadingXL}:text-is("${ContactOrderForAdoptionDocumentUploadContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ContactOrderForAdoptionDocumentUploadContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ContactOrderForAdoptionDocumentUploadContent.spanA}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.uploadAFile}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.Span}:text-is("${ContactOrderForAdoptionDocumentUploadContent.spanA}")`,
    );
    await Helpers.checkGroup(
      page,
      5,
      ContactOrderForAdoptionDocumentUploadContent,
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
        `${Selectors.a}:text-is("${ContactOrderForAdoptionDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
    ]);
    let fileInput = page.locator(
      `${CitizenOtherProceedingsDocumentUploadSelectors.documentUpload}`,
    );
    await fileInput.setInputFiles(config.testOdtFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.uploadFile}")`,
    );
    await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ContactOrderForAdoptionDocumentUploadContent.errorMessageUploadCorrectFile}")`,
        1,
      );
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    let fileInput = page.locator(
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
    const isUploaded = await page.isVisible(
      `${CitizenOtherProceedingsDocumentUploadSelectors.uploadConfirmationSelector}`,
    );
    expect(isUploaded).toBeTruthy();
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
