import { expect, Page } from "@playwright/test";
import {
  C100CaseDocumentsTabContent
} from "../../../../fixtures/manageCases/caseTabs/C100/c100CaseDocumentsTabContent.js";


export class C100CaseDocumentsTabPage {
  public static async c100CaseDocumentsTabPageManageDocuments(
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
            C100CaseDocumentsTabContent.text16_docCategory,
          ),
        ).toBeVisible(),
        expect(
          uploadedDocsSection.getByText(
            C100CaseDocumentsTabContent.text16_submittedBy,
          ),
        ).toBeVisible(),
        expect(
          uploadedDocsSection.getByText(
            C100CaseDocumentsTabContent.text16_document,
          ).first(),
        ).toBeVisible(),
        expect(
          uploadedDocsSection.getByText(
            C100CaseDocumentsTabContent.text16_submittedDate,
          ),
        ).toBeVisible(),
        expect(
          page
            .getByRole("link")
            .filter({ hasText: C100CaseDocumentsTabContent.link }),
        ).toBeVisible(),
        expect(
          uploadedDocsSection.getByText(
            C100CaseDocumentsTabContent.text16_uploadedBy,
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
