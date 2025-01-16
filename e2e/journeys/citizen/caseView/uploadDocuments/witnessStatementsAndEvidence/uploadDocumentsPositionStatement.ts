import { ActivateCase, CaseUser } from "../../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { UploadPage } from "../../../../../pages/citizen/caseView/uploadDocuments/uploadPage.ts";
import { PositionStatementPage } from "../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/positionStatementPage.ts";
import { DocumentSharingDetailsPage } from "../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/documentSharingDetailsPage.ts";
import { SharingYourDocumentsPage } from "../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/sharingYourDocumentsPage.ts";
import { OtherPartyNotSeeDocumentPage } from "../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/otherPartyNotSeeDocumentPage.ts";
import { UploadYourDocumentsPage } from "../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/uploadYourDocumentsPage.ts";
import { SubmitExtraEvidencePage } from "../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/submitExtraEvidencePage.ts";
import { yesNoNA } from "../../../../../common/types.ts";
import { UploadContent } from "../../../../../fixtures/citizen/caseView/uploadDocuments/uploadContent.ts";
import { Selectors } from "../../../../../common/selectors.ts";

interface uploadDocumentsPositionStatementParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  yesNoNA: yesNoNA;
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
 }: uploadDocumentsPositionStatementParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
    });
    await page.click(UniqueSelectors.uploadDocumentsPrivateSelector);
    await UploadPage.uploadPage(
      page,
      accessibilityTest,
    );
    await page.click(`${Selectors.GovukLink}:has-text("${UploadContent.positionStatementLink}")`);
    if (yesNoNA == "Yes") {
      await PositionStatementPage.courtPermissionPage(
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
      await UploadYourDocumentsPage.uploadYourDocumentsPage(
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
