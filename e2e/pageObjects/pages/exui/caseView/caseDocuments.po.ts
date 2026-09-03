import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class CaseDocumentsPage extends CaseAccessViewPage {
  readonly localAuthorityUploadedDocumentsSection: Locator = this.page.locator(
    "#case-viewer-field-read--localAuthorityUploadDocListDocTab",
  );
  readonly courtStaffUploadedDocumentsSection: Locator = this.page.locator(
    "#case-viewer-field-read--courtStaffUploadDocListDocTab",
  );

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Case documents" }).click();
  }

  /**
   * Verifies each given document appears in the "Local Authority uploaded
   * documents" collection, checking its category and uploaded file name.
   * Confidential/restricted documents stay out of this section until
   * reviewed. "CIR extension request" and "CIR transfer request" are
   * default-confidential categories and never appear here, even after review.
   */
  async assertLocalAuthorityUploadedDocuments(
    documents: Array<{ documentCategory: string; filePath: string }>,
  ): Promise<void> {
    await expect(this.localAuthorityUploadedDocumentsSection).toBeVisible();
    for (const doc of documents) {
      const fileName = doc.filePath.split(/[\\/]/).pop() ?? doc.filePath;
      await expect(
        this.localAuthorityUploadedDocumentsSection.getByText(
          doc.documentCategory,
          { exact: true },
        ),
      ).toBeVisible();
      await expect(
        this.localAuthorityUploadedDocumentsSection.getByText(fileName),
      ).toBeVisible();
    }
  }

  /**
   * Verifies each given document is listed once on this tab. The text is
   * matched exactly so that, for example, "FL401FinalDocument.pdf" cannot be
   * satisfied by "FL401FinalDocumentWelsh.pdf".
   *
   * @param fileNames the file names that must appear.
   */
  async assertFinalDocuments(fileNames: string[]): Promise<void> {
    await Promise.all(
      fileNames.map(async (fileName: string) => {
        const documentLink: Locator = this.page.locator(
          `${Selectors.GovLink}:text-is("${fileName}")`,
        );
        await expect
          .soft(documentLink, `Case documents should list "${fileName}" once`)
          .toHaveCount(1);
        await expect.soft(documentLink).toBeVisible();
      }),
    );
  }

  /**
   * Locates one document's panel within "Court staff uploaded documents".
   * Confirmed against the real DOM: this collection renders one
   * `.complex-panel` per document, titled "Court staff uploaded documents N",
   * each with its own "Document category"/"Submitted by"/"Document"/
   * "Submitted date"/"Uploaded by" rows — the exact same shape as the
   * "Add a document N" panels on the Manage documents CYA page (see
   * `ManageDocumentsNewSubmitPage.documentPanel`). There is no single shared
   * header row: each label repeats once per panel, so assertions must be
   * scoped to one panel at a time rather than searched for section-wide.
   */
  private documentPanel(index: number): Locator {
    return this.courtStaffUploadedDocumentsSection
      .locator(".complex-panel")
      .filter({
        has: this.page.locator(
          `${Selectors.GovukText16}:text-is("Court staff uploaded documents ${index + 1}")`,
        ),
      });
  }

  /**
   * Verifies each given document uploaded by court staff (e.g. via Manage
   * documents) appears in its own panel in the "Court staff uploaded
   * documents" collection, checking its category, submitting party and
   * uploaded file name. Shared across C100 and FL401 — both cases render the
   * same selectors and copy for this section. Derives the file name from
   * `filePath` the same way as {@link assertLocalAuthorityUploadedDocuments}.
   */
  async assertCourtStaffUploadedDocuments(
    documents: Array<{
      documentParty: string;
      documentCategory: string;
      filePath: string;
    }>,
  ): Promise<void> {
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      const fileName = doc.filePath.split(/[\\/]/).pop() ?? doc.filePath;
      const panel = this.documentPanel(i);

      await expect
        .soft(
          panel,
          `Panel "Court staff uploaded documents ${i + 1}" should be unique`,
        )
        .toHaveCount(1);

      await Promise.all([
        expect(
          panel.getByRole("row", {
            name: `Document category ${doc.documentCategory}`,
            exact: true,
          }),
        ).toBeVisible(),
        expect(
          panel.getByRole("row", {
            name: `Submitted by ${doc.documentParty}`,
            exact: true,
          }),
        ).toBeVisible(),
        expect(
          panel.getByRole("row", {
            name: `Document ${fileName}`,
            exact: true,
          }),
        ).toBeVisible(),
        expect(
          panel.locator(`${Selectors.GovukText16}:text-is("Submitted date")`),
        ).toHaveCount(1),
        expect(
          panel.locator(`${Selectors.GovukText16}:text-is("Uploaded by")`),
        ).toHaveCount(1),
      ]);
    }
  }
}
