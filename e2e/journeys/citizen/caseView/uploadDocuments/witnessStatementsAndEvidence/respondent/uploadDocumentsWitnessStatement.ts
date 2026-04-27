import { expect, Page } from "@playwright/test";
import { UploadPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/uploadPage.ts";
import { WitnessStatementPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/witnessStatementPage.ts";
import { DocumentSharingDetailsPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/documentSharingDetailsPage.ts";
import { SharingYourDocumentsPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/sharingYourDocumentsPage.ts";
import { OtherPartyNotSeeDocumentPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/otherPartyNotSeeDocumentPage.ts";
import { UploadYourDocumentsWitnessStatementPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/uploadYourDocumentsWitnessStatementPage.ts";
import { SubmitExtraEvidencePage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/submitExtraEvidencePage.ts";
import { yesNoNA } from "../../../../../../common/types.ts";
import { UploadContent } from "../../../../../../fixtures/citizen/caseView/uploadDocuments/uploadContent.ts";
import { DocumentSubmittedPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/documentSubmittedPage.ts";
import {
  CitizenC100CaseUtils,
  CitizenUploadedDocument,
} from "../../../../../../utils/citizenC100CaseUtils.ts";

interface uploadDocumentsWitnessStatementParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoNA: yesNoNA;
  citizenC100CaseUtils: CitizenC100CaseUtils;
  caseRef: string;
}

enum UniqueSelectors {
  uploadDocumentsPrivateSelector = "#uploadDocuments",
}

export class UploadDocumentsWitnessStatement {
  public static async uploadDocumentsWitnessStatement({
    page,
    accessibilityTest,
    yesNoNA,
    citizenC100CaseUtils,
    caseRef,
  }: uploadDocumentsWitnessStatementParams): Promise<void> {
    await page.locator(UniqueSelectors.uploadDocumentsPrivateSelector).click();
    await UploadPage.uploadPage(page, accessibilityTest);
    await page
      .getByRole("link", { name: UploadContent.witnessStatementLink })
      .click();
    if (yesNoNA == "Yes") {
      await WitnessStatementPage.witnessStatementPage(
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
      await UploadYourDocumentsWitnessStatementPage.uploadYourDocumentsWitnessStatementPage(
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
      expect(citizenUploadedDocuments.uploader).toEqual("Mary Richards");
      expect(citizenUploadedDocuments.category).toEqual("Witness statements");
      expect(citizenUploadedDocuments.fileName).toEqual("mockFile.pdf");
    } else {
      await SubmitExtraEvidencePage.submitExtraEvidencePage(
        page,
        accessibilityTest,
      );
    }
  }
}
