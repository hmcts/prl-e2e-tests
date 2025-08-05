import { expect, Page } from "@playwright/test";
import {
  FL401CaseDocumentsTabContent
} from "../../../../fixtures/manageCases/caseTabs/FL401/fl401CaseDocumentsTabContent.js";


export class Fl401CaseDocumentsTabPage{
  public static async fl401CaseDocumentsTabPageManageDocuments(
    page: Page,
    documentParty: string,
    documentCategory: string,
  ): Promise<void> {
    const uploadedDocsSection = page.locator(
      "#case-viewer-field-read--courtStaffUploadDocListDocTab",
    );
      await Promise.all([
        expect(
          uploadedDocsSection.getByText(
            FL401CaseDocumentsTabContent.text16_docCategory,
          ),
        ).toBeVisible(),
        expect(
          uploadedDocsSection.getByText(
            FL401CaseDocumentsTabContent.text16_submittedBy,
          ),
        ).toBeVisible(),
        expect(
          uploadedDocsSection.getByText(
            FL401CaseDocumentsTabContent.text16_document,
          ),
        ).toBeVisible(),
        expect(
          uploadedDocsSection.getByText(
            FL401CaseDocumentsTabContent.text16_submittedDate,
          ),
        ).toBeVisible(),
        expect(
          page
            .getByRole("link")
            .filter({ hasText: FL401CaseDocumentsTabContent.link }),
        ).toBeVisible(),
        expect(
          uploadedDocsSection.getByText(
            FL401CaseDocumentsTabContent.text16_uploadedBy,
            { exact: true },
          ),
        ).toBeVisible(),
        expect(
          uploadedDocsSection.getByText(documentCategory),
        ).toBeVisible(),
        expect(uploadedDocsSection.getByText(documentParty),
          ).toBeVisible(),
      ]);
    }
}
