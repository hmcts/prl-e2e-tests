import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

/** Expected values for a single document on the Check your answers page. */
export interface DocumentExpectation {
  documentCategory: string;
  confidentialDocument: boolean;
  restrictDocument: boolean;
}

export class ManageDocumentsNewSubmitPage extends CheckYourAnswersPage {
  private readonly restrictedReasonText: string =
    "This needs to be restricted as this is very sensitive information.";

  constructor(page: Page) {
    super(page, "Manage documents", CommonStaticText.saveAndContinue);
  }

  /**
   * Each collection item on the CYA page renders as:
   *   ccd-read-complex-field-table > .complex-panel
   * containing a title ("Add a document N") and a .complex-panel-table of rows.
   */
  private documentPanel(index: number): Locator {
    return this.page
      .locator("ccd-read-complex-field-table .complex-panel")
      .filter({
        has: this.page.locator(
          `${Selectors.GovukText16}:text-is("Add a document ${index + 1}")`,
        ),
      });
  }

  /**
   * Verifies the CYA page for a Manage Documents event, scoping each
   * assertion to its own collection-item panel so per-document values
   * (category, confidentiality, restriction) aren't cross-matched.
   */
  async assertDocumentsPageContents(
    documentParty: string,
    documents: DocumentExpectation[],
  ): Promise<void> {
    await this.assertPageHeadings();

    for (let i = 0; i < documents.length; i++) {
      await this.assertDocumentPanel(i, documents[i], documentParty);
    }
  }

  private async assertDocumentPanel(
    index: number,
    document: DocumentExpectation,
    documentParty: string,
  ): Promise<void> {
    const panel = this.documentPanel(index);
    // Exactly one panel titled "Add a document N" must exist
    await expect
      .soft(panel, `Panel "Add a document ${index + 1}" should be unique`)
      .toHaveCount(1);

    const assertions: Promise<void>[] = [
      expect
        .soft(
          panel.getByRole("row", {
            name: "Confirm the document is related to this case Yes, the document belongs to the case",
            exact: true,
          }),
        )
        .toBeVisible(),
      expect
        .soft(
          panel.getByRole("row", {
            name: `Submitting document on behalf of ${documentParty}`,
            exact: true,
          }),
        )
        .toBeVisible(),
      expect
        .soft(
          panel.getByRole("row", {
            name: `Document category ${document.documentCategory}`,
            exact: true,
          }),
        )
        .toBeVisible(),
      expect
        .soft(panel.locator(`${Selectors.GovukText16}:text-is("Document")`))
        .toHaveCount(1),
      expect
        .soft(
          panel.getByRole("row", {
            name: `Does the document contain confidential information? ${
              document.confidentialDocument
                ? CommonStaticText.yes
                : CommonStaticText.no
            }`,
            exact: true,
          }),
        )
        .toBeVisible(),
      expect
        .soft(
          panel.getByRole("row", {
            name: `Do you want to request this document is restricted? ${
              document.restrictDocument
                ? CommonStaticText.yes
                : CommonStaticText.no
            }`,
            exact: true,
          }),
        )
        .toBeVisible(),
      ...(document.restrictDocument
        ? [
            expect
              .soft(
                panel.locator(
                  `${Selectors.GovukText16}:text-is("Explain why you want to restrict access to the document")`,
                ),
              )
              .toHaveCount(1),
            expect
              .soft(
                panel.locator(
                  `${Selectors.Span}:text-is("${this.restrictedReasonText}")`,
                ),
              )
              .toBeVisible(),
          ]
        : []),
    ];

    await Promise.all(assertions);
  }
}
