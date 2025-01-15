import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { UploadYourDocumentsContent } from "../../../../../fixtures/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/uploadYourDocumentsContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import config from "../../../../../config.ts";

export enum UniqueSelectors {
  fileUpload = "#uploadDocumentFileUpload"
}

export class UploadYourDocumentsPage {
  public static async uploadYourDocumentsPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: UploadYourDocumentsContent.GovukHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${UploadYourDocumentsContent.GovukCaptionL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        UploadYourDocumentsContent,
        `GovukLabel`,
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${UploadYourDocumentsContent.GovukBody1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${UploadYourDocumentsContent.GovukBody2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryText}:text-is("${UploadYourDocumentsContent.GovukSummaryText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${UploadYourDocumentsContent.GovukHeadingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${UploadYourDocumentsContent.GovukWarningText}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {
    const fileInput = page.locator(UniqueSelectors.fileUpload);
    await fileInput.setInputFiles(config.testPdfFile);
    await page.check('input[type="checkbox"][value="declaration"]');
    await page.click(`${Selectors.GovukButton}:text-is("${CommonStaticText.uploadFile}")`,);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukSummaryListValue}:text-is("${UploadYourDocumentsContent.GovukSummaryListValue}")`,
      1,
    );
    await page.click(
        `${Selectors.GovukButton}:text-is("${CommonStaticText.submit}")`,
      );
  }
}
