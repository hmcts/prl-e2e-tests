import { Page } from "@playwright/test";
import { ManageDocumentsNew1Content } from "../../../../fixtures/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Content.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import config from "../../../../utils/config.utils.ts";

interface ManageDocumentsNew1PageParams {
  page: Page;
  accessibilityTest: boolean;
  documentParty: string;
  documentCategory: string;
  restrictDocument: boolean;
  confidentialDocument: boolean;
}

enum UniqueSelectors {
  documentRelatedToCaseYes = "#manageDocuments_0_documentRelatedToCaseCheckbox-RELATED_TO_CASE",
  documentParty = "#manageDocuments_0_documentParty",
  documentCategory = "#manageDocuments_0_documentCategories",
  uploadDocument = "#manageDocuments_0_document",
  documentConfidentialYes = "#manageDocuments_0_isConfidential_Yes",
  documentConfidentialNo = "#manageDocuments_0_isConfidential_No",
  documentRestrictedYes = "#manageDocuments_0_isRestricted_Yes",
  documentRestrictedNo = "#manageDocuments_0_isRestricted_No",
  documentRestrictedReason = "#manageDocuments_0_restrictedDetails",
}

export class ManageDocumentsNew1Page {
  public static async manageDocumentsNew1Page({
    page,
    accessibilityTest,
    documentParty,
    documentCategory,
    restrictDocument,
    confidentialDocument,
  }: ManageDocumentsNew1PageParams): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
      documentParty,
      documentCategory,
      restrictDocument,
      confidentialDocument,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageDocumentsNew1PageParams>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageDocumentsNew1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${ManageDocumentsNew1Content.headingH2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ManageDocumentsNew1Content.headingH3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${ManageDocumentsNew1Content.buttonText2}")`,
        1,
      ),
      Helpers.checkGroup(page, 3, ManageDocumentsNew1Content, "p", Selectors.p),
      Helpers.checkGroup(
        page,
        4,
        ManageDocumentsNew1Content,
        "formHint",
        Selectors.GovukFormHint,
      ),
      Helpers.checkGroup(
        page,
        7,
        ManageDocumentsNew1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${ManageDocumentsNew1Content.warningText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
    }
  }
  private static async fillInFields({
    page,
    documentParty,
    documentCategory,
    restrictDocument,
    confidentialDocument,
  }: Partial<ManageDocumentsNew1PageParams>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page.click(UniqueSelectors.documentRelatedToCaseYes);
    await page.selectOption(UniqueSelectors.documentParty, {
      label: documentParty,
    });
    await page.selectOption(UniqueSelectors.documentCategory, {
      label: documentCategory,
    });
    const fileInput = page.locator(UniqueSelectors.uploadDocument);
    await fileInput.setInputFiles(config.testPdfFile);
    await page
      .locator(Selectors.GovukErrorMessage, { hasText: "Uploading..." })
      .waitFor({ state: "hidden" });
    if (confidentialDocument) {
      await page.click(UniqueSelectors.documentConfidentialYes);
    } else {
      await page.click(UniqueSelectors.documentConfidentialNo);
    }
    if (restrictDocument) {
      await page.click(UniqueSelectors.documentRestrictedYes);
      await page.fill(
        UniqueSelectors.documentRestrictedReason,
        ManageDocumentsNew1Content.inputText,
      );
    } else {
      await page.click(UniqueSelectors.documentRestrictedNo);
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  /**
   * Public static helper — fills a single document slot by index (0-based).
   * Used when uploading multiple documents in one Manage Documents event without
   * going through the full page assertion flow each time.
   */
  public static async fillDocumentSlot({
    page,
    index,
    documentParty,
    documentCategory,
    confidentialDocument,
    restrictDocument,
    filePath,
  }: {
    page: Page;
    index: number;
    documentParty: string;
    documentCategory: string;
    confidentialDocument: boolean;
    restrictDocument: boolean;
    filePath?: string;
  }): Promise<void> {
    const idx = index;
    await page.click(
      `#manageDocuments_${idx}_documentRelatedToCaseCheckbox-RELATED_TO_CASE`,
    );
    await page.selectOption(`#manageDocuments_${idx}_documentParty`, {
      label: documentParty,
    });
    await page.selectOption(`#manageDocuments_${idx}_documentCategories`, {
      label: documentCategory,
    });

    const fileInput = page.locator(`#manageDocuments_${idx}_document`);
    await fileInput.setInputFiles(filePath ?? config.testPdfFile);
    // Allow 10 seconds for the upload to register before checking completion.
    // NOTE: this spacing also keeps document uploads under the doc-store rate
    // limit — cutting it shorter causes "Your request was rate limited" errors.
    await page.waitForTimeout(10_000);
    await page
      .locator(
        `label[for="manageDocuments_${idx}_document"] ~ span.error-message`,
      )
      .waitFor({ state: "hidden", timeout: 60_000 });

    if (confidentialDocument) {
      await page.click(`#manageDocuments_${idx}_isConfidential_Yes`);
    } else {
      await page.click(`#manageDocuments_${idx}_isConfidential_No`);
    }

    if (restrictDocument) {
      await page.click(`#manageDocuments_${idx}_isRestricted_Yes`);
      await page.fill(
        `#manageDocuments_${idx}_restrictedDetails`,
        ManageDocumentsNew1Content.inputText,
      );
    } else {
      await page.click(`#manageDocuments_${idx}_isRestricted_No`);
    }
  }

  public static async clickContinue(page: Page): Promise<void> {
    await this.continue(page);
  }
}
