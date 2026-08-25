import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";

/**
 * Expected values for a single document on the "Documents to be reviewed" tab.
 * A subset of the upload fixture shape, so LA_DOCUMENTS entries pass straight
 * through without mapping.
 */
export interface ReviewableDocumentExpectation {
  documentCategory: string;
  filePath: string;
  restrictDocument?: boolean;
}

export class DocumentsToBeReviewedPage extends CaseAccessViewPage {
  private readonly documentParty: string = "Local authority";
  private readonly restrictedReasonText: string =
    "This needs to be restricted as this is very sensitive information.";

  /** The quarantine collection holding everything awaiting court admin review. */
  readonly localAuthorityQuarantineSection: Locator = this.page.locator(
    "#case-viewer-field-read--localAuthorityQuarantineDocsList",
  );

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page
      .getByRole("tab", { name: "Documents to be reviewed" })
      .click();
  }

  private documentPanel(index: number): Locator {
    return this.localAuthorityQuarantineSection
      .locator(".complex-panel")
      .filter({
        has: this.page.getByText(
          `Local Authority uploaded documents ${index + 1}`,
          { exact: true },
        ),
      });
  }

  /**
   * Verifies the tab lists exactly the given documents, in upload order,
   * scoping every assertion to its own panel so values are not cross-matched
   * between panels. The panel count is derived from `documents`, so the check
   * follows the fixture as the number of uploaded documents changes.
   *
   * "Submitted date" and "Uploaded by" are checked as present rows only.
   *
   * @param documents the documents expected to be awaiting review, in upload order.
   */
  async assertDocumentsToBeReviewed(
    documents: ReviewableDocumentExpectation[],
  ): Promise<void> {
    await expect(
      this.localAuthorityQuarantineSection.locator(".complex-panel"),
      `Should list exactly ${documents.length} document(s) awaiting review`,
    ).toHaveCount(documents.length);

    for (let i = 0; i < documents.length; i++) {
      await this.assertDocumentPanel(i, documents[i]);
    }
  }

  private async assertDocumentPanel(
    index: number,
    document: ReviewableDocumentExpectation,
  ): Promise<void> {
    const panel = this.documentPanel(index);
    const fileName =
      document.filePath.split(/[\\/]/).pop() ?? document.filePath;

    await Promise.all([
      expect
        .soft(
          panel.getByRole("row", {
            name: `Document category ${document.documentCategory}`,
            exact: true,
          }),
        )
        .toBeVisible(),
      expect
        .soft(
          panel.getByRole("row", {
            name: `Submitted by ${this.documentParty}`,
            exact: true,
          }),
        )
        .toBeVisible(),
      // CCD renders the document as a button, not an anchor.
      expect
        .soft(
          panel.getByRole("button", { name: fileName, exact: true }),
          `Panel ${index + 1} should show document "${fileName}"`,
        )
        .toBeVisible(),
      expect
        .soft(panel.getByText("Submitted date", { exact: true }))
        .toBeVisible(),
      expect
        .soft(panel.getByText("Uploaded by", { exact: true }))
        .toBeVisible(),
      expect
        .soft(
          panel.getByRole("row", {
            name: `Reason for restricted access ${this.restrictedReasonText}`,
            exact: true,
          }),
          `Panel ${index + 1} restriction reason`,
        )
        .toHaveCount(document.restrictDocument ? 1 : 0),
    ]);
  }
}
