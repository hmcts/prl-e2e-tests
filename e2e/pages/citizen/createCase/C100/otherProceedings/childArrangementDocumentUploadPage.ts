import { ChildArrangementOrderDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/childArrangementOrderDetailsContent";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { ChildArrangementDocumentUploadContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/childArrangementDocumentUploadContent";
import config from "../../../../../config";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { CitizenOtherProceedingsDocumentUploadSelectors } from "../../../../../common/commonUniqueSelectors";

interface ChildArrangementDocumentUploadPageOptions {
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

export class ChildArrangementDocumentUploadPage {
  public static async documentUploadPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: ChildArrangementDocumentUploadPageOptions): Promise<void> {
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
      `${Selectors.p}:text-is("${ChildArrangementOrderDetailsContent.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${ChildArrangementDocumentUploadContent.h1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildArrangementDocumentUploadContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ChildArrangementDocumentUploadContent.spanA}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ChildArrangementDocumentUploadContent.formLabel}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.Span}:text-is("${ChildArrangementDocumentUploadContent.spanA}")`,
    );
    await Helpers.checkGroup(
      page,
      5,
      ChildArrangementDocumentUploadContent,
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
        `${Selectors.a}:text-is("${ChildArrangementDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildArrangementDocumentUploadContent.errorMessageChooseFile}")`,
        1,
      ),
    ]);
    let fileInput = page.locator(
      `${CitizenOtherProceedingsDocumentUploadSelectors.documentUpload}`,
    );
    await fileInput.setInputFiles(config.testOdtFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${ChildArrangementDocumentUploadContent.uploadFile}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ChildArrangementDocumentUploadContent.errorMessageUploadCorrectFile}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${ChildArrangementDocumentUploadContent.errorMessageUploadCorrectFile}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    const fileInput = page.locator(
      `${CitizenOtherProceedingsDocumentUploadSelectors.documentUpload}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${ChildArrangementDocumentUploadContent.uploadFile}")`,
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
