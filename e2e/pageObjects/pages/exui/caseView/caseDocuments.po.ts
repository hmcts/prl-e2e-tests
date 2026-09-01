import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class CaseDocumentsPage extends CaseAccessViewPage {
  readonly localAuthorityUploadedDocumentsSection: Locator = this.page.locator(
    "#case-viewer-field-read--localAuthorityUploadDocListDocTab",
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
}
