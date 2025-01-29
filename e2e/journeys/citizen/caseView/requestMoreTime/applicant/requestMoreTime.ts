import { ActivateCase, CaseUser } from "../../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { GuidanceApplicantPage } from "../../../../../pages/citizen/caseView/requestMoreTime/guidanceApplicantPage.ts";
import { UploadYourApplicationPage } from "../../../../../pages/citizen/caseView/requestMoreTime/uploadYourApplicationPage.ts";
import { AgreementForRequestPage } from "../../../../../pages/citizen/caseView/requestMoreTime/agreementForRequestPage.ts";
import { DocumentUploadPage } from "../../../../../pages/citizen/caseView/requestMoreTime/documentUploadPage.ts";
import { SupportingDocumentsPage } from "../../../../../pages/citizen/caseView/requestMoreTime/supportingDocumentsPage.ts";
import { SupportingDocumentUploadPage } from "../../../../../pages/citizen/caseView/requestMoreTime/supportingDocumentUploadPage.ts";
import { UrgentRequestPage } from "../../../../../pages/citizen/caseView/requestMoreTime/urgentRequestPage.ts";
import { CheckAnswersApplicantPage } from "../../../../../pages/citizen/caseView/requestMoreTime/checkAnswersApplicantPage.ts";
import { applicationSubmittedBy } from "../../../../../common/types.ts";

interface requestMoreTimeParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
  completedForm: boolean;
  agreementForRequest: boolean;
  supportingDocuments: boolean;
  reasonUrgentRequest: boolean;
}

enum UniqueSelectors {
  requestToCourtAboutYourCase = "#requestToCourtAboutYourCase",
}

export class RequestMoreTime {
  public static async requestMoreTime({
    page,
    browser,
    caseRef,
    accessibilityTest,
    isApplicant,
    applicationSubmittedBy,
    completedForm,
    agreementForRequest,
    supportingDocuments,
    reasonUrgentRequest,
  }: requestMoreTimeParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
      applicationSubmittedBy: applicationSubmittedBy,
    });
    await page.click(UniqueSelectors.requestToCourtAboutYourCase);
    await page.click('a[href="/applicant/application-within-proceedings/C2/request-more-time/guidance"]');
    await GuidanceApplicantPage.guidanceApplicantPage(page, accessibilityTest);
    await UploadYourApplicationPage.uploadYourApplicationPage(page, accessibilityTest, completedForm);
    await AgreementForRequestPage.agreementForRequestPage(page, accessibilityTest, agreementForRequest);
    await DocumentUploadPage.documentUploadPage(page, accessibilityTest);
    await SupportingDocumentsPage.supportingDocumentsPage(page, accessibilityTest, supportingDocuments);
    await SupportingDocumentUploadPage.supportingDocumentUploadPage(page, accessibilityTest);
    await UrgentRequestPage.urgentRequestPage(page, accessibilityTest, reasonUrgentRequest);
    await CheckAnswersApplicantPage.checkAnswersApplicantPage(page, accessibilityTest);
  }
}
