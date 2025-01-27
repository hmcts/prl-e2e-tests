import {
  ActivateCase,
  CaseUser,
} from "../../../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { UploadPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/uploadPage.ts";
import { WitnessStatementPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/witnessStatementPage.ts";
import { DocumentSharingDetailsPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/documentSharingDetailsPage.ts";
import { SharingYourDocumentsPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/sharingYourDocumentsPage.ts";
import { OtherPartyNotSeeDocumentPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/otherPartyNotSeeDocumentPage.ts";
import { UploadYourDocumentsWitnessStatementPage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/uploadYourDocumentsWitnessStatementPage.ts";
import { SubmitExtraEvidencePage } from "../../../../../../pages/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/submitExtraEvidencePage.ts";
import {
  applicationSubmittedBy,
  yesNoNA,
} from "../../../../../../common/types.ts";
import { UploadContent } from "../../../../../../fixtures/citizen/caseView/uploadDocuments/uploadContent.ts";
import { Selectors } from "../../../../../../common/selectors.ts";

interface uploadDocumentsWitnessStatementParams {
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

export class UploadDocumentsWitnessStatement {
  public static async uploadDocumentsWitnessStatement({
    page,
    browser,
    caseRef,
    accessibilityTest,
    isApplicant,
    yesNoNA,
    applicationSubmittedBy,
  }: uploadDocumentsWitnessStatementParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
      applicationSubmittedBy: applicationSubmittedBy,
    });
    await page.click(UniqueSelectors.uploadDocumentsPrivateSelector);
    await UploadPage.uploadPage(page, accessibilityTest);
    await page.click(
      `${Selectors.GovukLink}:has-text("${UploadContent.witnessStatementLink}")`,
    );
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
    } else {
      await SubmitExtraEvidencePage.submitExtraEvidencePage(
        page,
        accessibilityTest,
      );
    }
  }
}
