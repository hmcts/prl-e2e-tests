import { ActivateCase, CaseUser } from "../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { UploadPage } from "../../../../pages/citizen/caseView/uploadDocuments/uploadPage.ts";
import { CourtPermissionPage } from "../../../../pages/citizen/caseView/uploadDocuments/yourPositionStatement/courtPermissionPage.ts";
import { DocumentSharingDetailsPage } from "../../../../pages/citizen/caseView/uploadDocuments/yourPositionStatement/documentSharingDetailsPage.ts";
import { SharingYourDocumentsPage } from "../../../../pages/citizen/caseView/uploadDocuments/yourPositionStatement/sharingYourDocumentsPage.ts";
import { OtherPartyNotSeeDocumentPage } from "../../../../pages/citizen/caseView/uploadDocuments/yourPositionStatement/otherPartyNotSeeDocumentPage.ts";
import { UploadYourDocumentsPage } from "../../../../pages/citizen/caseView/uploadDocuments/yourPositionStatement/uploadYourDocumentsPage.ts";
import { SubmitExtraEvidencePage } from "../../../../pages/citizen/caseView/uploadDocuments/yourPositionStatement/submitExtraEvidencePage.ts";
import { yesNoNA } from "../../../../common/types.ts";

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
    await page.click('a:has-text("Your position statement")');
    if (yesNoNA == "Yes") {
      await CourtPermissionPage.courtPermissionPage(
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
