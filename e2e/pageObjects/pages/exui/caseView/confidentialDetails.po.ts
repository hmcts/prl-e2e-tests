import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export interface ManageDocumentsConfidentialSectionParams {
  documentParty: string;
  documentCategory: string;
  restrictDocument: boolean;
  confidentialDocument: boolean;
  /** The file uploaded for this document; used to derive the confidential
   * file name (the server prefixes it with "Confidential_" once a document
   * is marked confidential and/or restricted). */
  filePath: string;
}

export class ConfidentialDetailsPage extends CaseAccessViewPage {
  private readonly restrictedReasonText: string =
    "This needs to be restricted as this is very sensitive information.";

  readonly confidentialDocsSection: Locator = this.page.locator(
    "#case-viewer-field-read--confidentialDocuments",
  );
  readonly restrictedDocsSection: Locator = this.page.locator(
    "#case-viewer-field-read--restrictedDocuments",
  );

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Confidential details" }).click();
  }

  /**
   * Verifies the Confidential details tab after a Manage documents event has
   * uploaded a confidential and/or restricted document. Shared across C100 and
   * FL401 — both cases render the same selectors and copy for this section.
   */
  async assertManageDocumentsSection({
    documentParty,
    documentCategory,
    restrictDocument,
    confidentialDocument,
    filePath,
  }: ManageDocumentsConfidentialSectionParams): Promise<void> {
    const fileName = filePath.split(/[\\/]/).pop() ?? filePath;
    const confidentialFileName = `Confidential_${fileName}`;
    if (restrictDocument) {
      await this.assertRestrictedDocument(
        documentParty,
        documentCategory,
        confidentialFileName,
        restrictDocument,
      );
    } else if (confidentialDocument) {
      await this.assertConfidentialDocument(
        documentParty,
        documentCategory,
        confidentialFileName,
      );
    }
  }

  private async assertRestrictedDocument(
    documentParty: string,
    documentCategory: string,
    confidentialFileName: string,
    restrictDocument: boolean,
  ): Promise<void> {
    await this.page
      .locator("ccd-field-read-label")
      .filter({ hasText: new RegExp(`^${documentCategory}$`) })
      .locator("div")
      .click();

    await Promise.all([
      expect(
        this.restrictedDocsSection.getByText("Restricted documents"),
      ).toBeVisible(),
      expect(
        this.restrictedDocsSection.getByText("Document category"),
      ).toBeVisible(),
      expect(
        this.restrictedDocsSection.getByRole("columnheader", {
          name: "Uploaded by",
        }),
      ).toBeVisible(),
      expect(
        this.restrictedDocsSection.getByText("Submitted date"),
      ).toBeVisible(),
      expect(
        this.restrictedDocsSection.getByText("Submitted by"),
      ).toBeVisible(),
      expect(
        this.page
          .locator("ccd-field-read-label")
          .filter({ hasText: new RegExp(`^${documentCategory}$`) })
          .locator("div"),
      ).toBeVisible(),
      expect(
        this.page
          .locator("ccd-field-read-label")
          .filter({ hasText: new RegExp(`^${documentParty}$`) })
          .locator("div"),
      ).toBeVisible(),
      expect(
        this.restrictedDocsSection.getByRole("columnheader", {
          name: "Document",
          exact: true,
        }),
      ).toBeVisible(),
      expect(
        this.page.locator(Selectors.GovLink, {
          hasText: confidentialFileName,
        }),
      ).toBeVisible(),
      expect(
        this.restrictedDocsSection
          .getByRole("columnheader", { name: "Uploaded by" })
          .locator("span"),
      ).toBeVisible(),
      // "Reason for restricted access" only renders when that field was
      // actually filled in — manageDocumentsNew1's fillDocumentSlot fills it
      // exactly when restrictDocument is true, so it never appears otherwise.
      // Mirrors DocumentsToBeReviewedPage.assertDocumentPanel's same check.
      expect
        .soft(
          this.restrictedDocsSection.getByRole("row", {
            name: `Reason for restricted access ${this.restrictedReasonText}`,
            exact: true,
          }),
          `"${documentCategory}" restriction reason`,
        )
        .toHaveCount(restrictDocument ? 1 : 0),
    ]);
  }

  private async assertConfidentialDocument(
    documentParty: string,
    documentCategory: string,
    confidentialFileName: string,
  ): Promise<void> {
    await this.confidentialDocsSection.getByText(documentCategory).click();

    // "Document" and "Uploaded by" render as two separate th/td row pairs in
    // the accordion detail table (confirmed against real DOM for both C100
    // and FL401) — not a single merged cell, so this is checked the same way
    // for both case types rather than only for C100 as before.
    await Promise.all([
      expect(
        this.confidentialDocsSection.getByText("Confidential documents"),
      ).toBeVisible(),
      expect(
        this.confidentialDocsSection.getByText("Document category"),
      ).toBeVisible(),
      expect(
        this.confidentialDocsSection.getByText("Submitted by"),
      ).toBeVisible(),
      expect(
        this.confidentialDocsSection.getByText("Submitted date"),
      ).toBeVisible(),
      expect(
        this.confidentialDocsSection.getByText("Uploaded by", {
          exact: true,
        }),
      ).toBeVisible(),
      expect(
        this.confidentialDocsSection.getByText(documentCategory),
      ).toBeVisible(),
      expect(
        this.confidentialDocsSection.getByText(documentParty),
      ).toBeVisible(),
      expect(
        this.confidentialDocsSection.getByRole("row", {
          name: `Document ${confidentialFileName}`,
          exact: true,
        }),
      ).toBeVisible(),
    ]);
  }
}
