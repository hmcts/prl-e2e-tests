import { Locator, Page, expect } from "@playwright/test";
import { ManageDocumentsNewSubmitContent } from "../../../../fixtures/manageCases/caseProgression/manageDocuments/manageDocumentsNewSubmitContent.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

import { ManageDocumentsNew1Content } from "../../../../fixtures/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Content.ts";
import { AxeUtils } from "@hmcts/playwright-common";

/** Expected values for a single document on the Check your answers page. */
export interface DocumentExpectation {
  documentCategory: string;
  confidentialDocument: boolean;
  restrictDocument: boolean;
}

interface ManageDocumentsNewSubmitPageParams {
  page: Page;
  accessibilityTest: boolean;
  documentParty: string;
  documentCategory: string;
  restrictDocument: boolean;
  confidentialDocument: boolean;
  /**
   * Per-document expectations for multi-document uploads.
   * When provided, each "Add a document N" panel is verified individually
   * and the single-document params above are ignored.
   */
  documents?: DocumentExpectation[];
}

export class ManageDocumentsNewSubmitPage {
  public static async manageDocumentsNewSubmitPage({
    page,
    accessibilityTest,
    documentParty,
    documentCategory,
    restrictDocument,
    confidentialDocument,
    documents,
  }: ManageDocumentsNewSubmitPageParams): Promise<void> {
    const expectedDocuments: DocumentExpectation[] = documents ?? [
      { documentCategory, confidentialDocument, restrictDocument },
    ];

    await this.checkPageLoads(
      page,
      accessibilityTest,
      documentParty,
      expectedDocuments,
    );

    await this.saveAndContinue(page);
  }

  /**
   * Locates the complex panel for the document at the given index (0-based).
   * Each collection item on the CYA page renders as:
   *   ccd-read-complex-field-table > .complex-panel
   * containing a title ("Add a document N") and a .complex-panel-table of rows.
   */
  private static documentPanel(page: Page, index: number): Locator {
    return page.locator("ccd-read-complex-field-table .complex-panel").filter({
      has: page.locator(
        `${Selectors.GovukText16}:text-is("${ManageDocumentsNewSubmitContent.text16_2} ${index + 1}")`,
      ),
    });
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    documentParty: string,
    documents: DocumentExpectation[],
  ): Promise<void> {
    const pageTitle = page.locator(
      `${Selectors.headingH2}:text-is("${ManageDocumentsNewSubmitContent.headingH2}")`,
    );
    await pageTitle.waitFor();

    // Page-level content (appears exactly once regardless of document count)
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ManageDocumentsNewSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ManageDocumentsNewSubmitContent.text16_1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ManageDocumentsNewSubmitContent.text16_2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ManageDocumentsNewSubmitContent.text16_11}")`,
        1,
      ),
    ]);

    // Per-document content — each document is verified within its own panel
    for (let i = 0; i < documents.length; i++) {
      await this.checkDocumentPanel(page, i, documents[i], documentParty);
    }

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkDocumentPanel(
    page: Page,
    index: number,
    document: DocumentExpectation,
    documentParty: string,
  ): Promise<void> {
    const panel = this.documentPanel(page, index);
    // Exactly one panel titled "Add a document N" must exist
    await expect
      .soft(panel, `Panel "Add a document ${index + 1}" should be unique`)
      .toHaveCount(1);

    const assertions: Promise<void>[] = [
      expect
        .soft(
          panel.getByRole("row", {
            name: `${ManageDocumentsNewSubmitContent.text16_4} ${ManageDocumentsNewSubmitContent.text16_5}`,
            exact: true,
          }),
        )
        .toBeVisible(),
      expect
        .soft(
          panel.getByRole("row", {
            name: `${ManageDocumentsNewSubmitContent.text16_6} ${documentParty}`,
            exact: true,
          }),
        )
        .toBeVisible(),
      expect
        .soft(
          panel.getByRole("row", {
            name: `${ManageDocumentsNewSubmitContent.text16_7} ${document.documentCategory}`,
            exact: true,
          }),
        )
        .toBeVisible(),
      expect
        .soft(
          panel.locator(
            `${Selectors.GovukText16}:text-is("${ManageDocumentsNewSubmitContent.text16_8}")`,
          ),
        )
        .toHaveCount(1),
      expect
        .soft(
          panel.getByRole("row", {
            name: `${ManageDocumentsNewSubmitContent.text16_9} ${
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
            name: `${ManageDocumentsNewSubmitContent.text16_10} ${
              document.restrictDocument
                ? CommonStaticText.yes
                : CommonStaticText.no
            }`,
            exact: true,
          }),
        )
        .toBeVisible(),
    ];

    if (document.restrictDocument) {
      assertions.push(
        expect
          .soft(
            panel.locator(
              `${Selectors.GovukText16}:text-is("${ManageDocumentsNewSubmitContent.text16_a}")`,
            ),
          )
          .toHaveCount(1),
        expect
          .soft(
            panel.locator(
              `${Selectors.Span}:text-is("${ManageDocumentsNew1Content.inputText}")`,
            ),
          )
          .toBeVisible(),
      );
    }

    await Promise.all(assertions);
  }

  private static async saveAndContinue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
