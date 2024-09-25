import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  UploadDocuments1Content
} from "../../../../../fixtures/manageCases/createCase/FL401/uploadDocuments/uploadDocuments1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Config } from "../../../../../config";

type wordOrPdfType = "word" | "pdf"

enum uniqueSelectors {
  addNewWitnessDocuments = 'div#fl401UploadWitnessDocuments > div > ',
  supportingDocuments = 'div#fl401UploadSupportDocuments > div > '
}

enum inputIDs {
  uploadWitnessDocuments =  '#fl401UploadWitnessDocuments_value',
  uploadSupportingDocuments = '#fl401UploadSupportDocuments_value'
}

interface UploadDocuments1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean
}

interface UploadWordDocumentsOptions {
  page: Page;
  wordOrPdf: wordOrPdfType
}

export class UploadDocuments1Page {
  public static async uploadDocuments1Page({
    page,
    accessibilityTest,
    errorMessaging,
  }: UploadDocuments1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page)
    }
    await this.fillInFields(
      page
    );
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${UploadDocuments1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        UploadDocuments1Content,
        "li",
        `${Selectors.li}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        UploadDocuments1Content,
        "h2",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        UploadDocuments1Content,
        "h3",
        `${Selectors.h3}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${UploadDocuments1Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${UploadDocuments1Content.strong1}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${UploadDocuments1Content.continue}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${UploadDocuments1Content.errorSummaryTitle}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${UploadDocuments1Content.validationError}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${UploadDocuments1Content.errorMessage}")`,
        1
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await this.uploadWordDocuments({
      page: page,
      wordOrPdf: 'word'
    });
    await this.uploadWordDocuments({
      page: page,
      wordOrPdf: 'pdf'
    });
    await page.click(
      `${Selectors.button}:text-is("${UploadDocuments1Content.continue}")`
    );
    await page.click(
      `${Selectors.button}:text-is("${UploadDocuments1Content.continue}")`
    );
  }

  private static async uploadWordDocuments({
   page,
   wordOrPdf
  }: UploadWordDocumentsOptions): Promise<void> {
    let docIndex: number;
    let docFile: string;
    let groupString: string;
    switch (wordOrPdf) {
      case 'word':
        docIndex = 0
        docFile = Config.testWordFile
        groupString = 'h3Subtitle'
        break
      case 'pdf':
        docIndex = 1
        docFile = Config.testPdfFile
        groupString = 'h3ExtraSubtitle'
        break
      default:
        console.log('Unrecognised file type, should be one of word or pdf')
        docIndex = 2
        docFile = ''
        groupString = ''
    }
    const addNewWitnessDocsLocator = page
      .locator(
        `${uniqueSelectors.addNewWitnessDocuments}${Selectors.button}:text-is("${UploadDocuments1Content.addNew}")`,
      )
      .nth(docIndex);
    await addNewWitnessDocsLocator.click();
    const addNewSupportingDocsLocator = page
      .locator(
        `${uniqueSelectors.supportingDocuments}${Selectors.button}:text-is("${UploadDocuments1Content.addNew}")`,
      )
      .nth(docIndex);
    await addNewSupportingDocsLocator.click();
    await Helpers.checkGroup(
      page,
      2,
      UploadDocuments1Content,
      groupString,
      `${Selectors.h3}`,
    );
    const witnessUpload = page.locator(
      inputIDs.uploadWitnessDocuments
    ).nth(docIndex)
    await witnessUpload.setInputFiles(docFile);
    const supportingUpload = page.locator(
      inputIDs.uploadSupportingDocuments
    ).nth(docIndex)
    await supportingUpload.setInputFiles(docFile);
  }
}