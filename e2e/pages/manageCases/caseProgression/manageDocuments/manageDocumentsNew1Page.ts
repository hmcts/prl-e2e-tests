import { Page } from "@playwright/test";
import { ManageDocumentsNew1Content } from "../../../../fixtures/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Content";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import config from "../../../../utils/config.utils";

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
        `${Selectors.button}:text-is("${ManageDocumentsNew1Content.buttonText}")`,
        2,
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
      // await new AxeUtils(page).audit();
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
    // wait for upload of document to be complete before continuing
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
}
