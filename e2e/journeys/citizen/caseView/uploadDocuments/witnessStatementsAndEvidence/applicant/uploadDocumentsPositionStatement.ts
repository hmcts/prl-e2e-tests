import { expect, Page } from "@playwright/test";
import { UploadPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/uploadPage.ts";
import { PositionStatementPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/positionStatementPage.ts";
import { DocumentSharingDetailsPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/documentSharingDetailsPage.ts";
import { SharingYourDocumentsPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/sharingYourDocumentsPage.ts";
import { OtherPartyNotSeeDocumentPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/otherPartyNotSeeDocumentPage.ts";
import { UploadYourDocumentsPositionStatementPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/uploadYourDocumentsPositionStatementPage.ts";
import { SubmitExtraEvidencePage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/submitExtraEvidencePage.ts";
import { yesNoNA } from "../../../../../../common/types.ts";
import { UploadContent } from "../../../../../../fixtures/citizen/caseView/uploadDocuments/uploadContent.ts";
import { DocumentSubmittedPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/documentSubmittedPage.ts";
import {
  CitizenC100CaseUtils,
  CitizenUploadedDocument,
} from "../../../../../../utils/citizenC100CaseUtils.ts";

interface uploadDocumentsPositionStatementParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoNA: yesNoNA;
  citizenC100CaseUtils: CitizenC100CaseUtils;
  caseRef: string;
}

enum UniqueSelectors {
  uploadDocumentsPrivateSelector = "#uploadDocuments",
}

export class UploadDocumentsPositionStatement {
  public static async uploadDocumentsPositionStatement({
    page,
    accessibilityTest,
    yesNoNA,
    citizenC100CaseUtils,
    caseRef,
  }: uploadDocumentsPositionStatementParams): Promise<void> {
    await page.locator(UniqueSelectors.uploadDocumentsPrivateSelector).click();
    await UploadPage.uploadPage(page, accessibilityTest);
    await page
      .getByRole("link", { name: UploadContent.positionStatementLink })
      .click();
    if (yesNoNA == "Yes") {
      await PositionStatementPage.positionStatementPage(
        page,
        accessibilityTest,
        yesNoNA,
      );
      await DocumentSharingDetailsPage.documentSharingDetailsPage(
        page,
        accessibilityTest,
      );
      await SharingYourDocumentsPage.sharingYourDocumentsPage(
        page,
        accessibilityTest,
        yesNoNA,
      );
      await OtherPartyNotSeeDocumentPage.otherPartyNotSeeDocumentPage(
        page,
        accessibilityTest,
      );
      await UploadYourDocumentsPositionStatementPage.uploadYourDocumentsPositionStatementPage(
        page,
        accessibilityTest,
      );
      await DocumentSubmittedPage.documentSubmittedPage(
        page,
        accessibilityTest,
      );

      // validate uploaded document in case data
      const citizenUploadedDocuments: CitizenUploadedDocument =
        await citizenC100CaseUtils.fetchCitizenUploadedDocuments(caseRef);
      expect(citizenUploadedDocuments.uploader).toEqual("John Doe");
      expect(citizenUploadedDocuments.category).toEqual("Position statements");
      expect(citizenUploadedDocuments.fileName).toEqual("mockFile.pdf");
    } else {
      await SubmitExtraEvidencePage.submitExtraEvidencePage(
        page,
        accessibilityTest,
      );
    }
  }
}
