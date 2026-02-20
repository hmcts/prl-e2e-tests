import { ActivateCase, CaseUser } from "../../../../activateCase/activateCase";
import { Browser, Page } from "@playwright/test";
import { UploadPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/uploadPage";
import { PositionStatementPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/positionStatementPage";
import { DocumentSharingDetailsPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/documentSharingDetailsPage";
import { SharingYourDocumentsPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/sharingYourDocumentsPage";
import { OtherPartyNotSeeDocumentPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/otherPartyNotSeeDocumentPage";
import { UploadYourDocumentsPositionStatementPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/uploadYourDocumentsPositionStatementPage";
import { SubmitExtraEvidencePage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/submitExtraEvidencePage";
import {
  applicationSubmittedBy,
  yesNoNA,
} from "../../../../../../common/types";
import { UploadContent } from "../../../../../../fixtures/citizen/caseView/uploadDocuments/uploadContent";
import { Selectors } from "../../../../../../common/selectors";

interface uploadDocumentsPositionStatementParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  yesNoNA: yesNoNA;
  applicationSubmittedBy: applicationSubmittedBy;
}

enum UniqueSelectors {
  uploadDocumentsPrivateSelector = "#uploadDocuments",
}

export class UploadDocumentsPositionStatement {
  public static async uploadDocumentsPositionStatement({
    page,
    browser,
    caseRef,
    accessibilityTest,
    isApplicant,
    yesNoNA,
    applicationSubmittedBy,
  }: uploadDocumentsPositionStatementParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
      applicationSubmittedBy: applicationSubmittedBy,
      isManualSOA: false,
    });
    await page.click(UniqueSelectors.uploadDocumentsPrivateSelector);
    await UploadPage.uploadPage(page, accessibilityTest);
    await page.click(
      `${Selectors.GovukLink}:has-text("${UploadContent.positionStatementLink}")`,
    );
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
    } else {
      await SubmitExtraEvidencePage.submitExtraEvidencePage(
        page,
        accessibilityTest,
      );
    }
  }
}
