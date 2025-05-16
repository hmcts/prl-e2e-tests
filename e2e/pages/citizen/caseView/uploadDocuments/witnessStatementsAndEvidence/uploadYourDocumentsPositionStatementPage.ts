import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { UploadYourDocumentsContent } from "../../../../../fixtures/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/uploadYourDocumentsContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import config from "../../../../../utils/config.ts";

export enum UniqueSelectors {
  fileUpload = "#uploadDocumentFileUpload",
  declarationCheck = "#declarationCheck",
  submitPositionStatement = "button[type='Submit'][name='onlyContinue']",
}

export class UploadYourDocumentsPositionStatementPage {
  public static async uploadYourDocumentsPositionStatementPage(
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
        hasText: UploadYourDocumentsContent.GovukHeadingLPositionStatement,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${UploadYourDocumentsContent.GovukHeadingLPositionStatement}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        UploadYourDocumentsContent,
        `GovukLabelP`,
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        UploadYourDocumentsContent,
        `liP`,
        `${Selectors.li}`,
      ),
      Helpers.checkGroup(
        page,
        6,
        UploadYourDocumentsContent,
        `GovukBodyP`,
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryText}:text-is("${UploadYourDocumentsContent.GovukSummaryText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${UploadYourDocumentsContent.GovukHint1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        UploadYourDocumentsContent,
        `GovukHeadingM`,
        `${Selectors.GovukHeadingM}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${UploadYourDocumentsContent.GovukWarningText}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.GovukSummaryText}:text-is("${UploadYourDocumentsContent.GovukSummaryText}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        UploadYourDocumentsContent,
        `hiddenLi`,
        `${Selectors.li}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    const fileInput = page.locator(UniqueSelectors.fileUpload);
    await fileInput.setInputFiles(config.testPdfFile);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.uploadFile}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukSummaryListValue}:text-is("${UploadYourDocumentsContent.GovukSummaryListValue}")`,
      1,
    );
    await page.check(UniqueSelectors.declarationCheck);
    await page.click(UniqueSelectors.submitPositionStatement);
  }
}
