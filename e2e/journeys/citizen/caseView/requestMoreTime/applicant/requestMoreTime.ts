import { ActivateCase, CaseUser } from "../../../activateCase/activateCase";
import { Browser, Page } from "@playwright/test";
import { GuidanceApplicantPage } from "../../../../../pages/citizen/caseView/requestMoreTime/guidanceApplicantPage";
import { UploadYourApplicationPage } from "../../../../../pages/citizen/caseView/requestMoreTime/uploadYourApplicationPage";
import { AgreementForRequestPage } from "../../../../../pages/citizen/caseView/requestMoreTime/agreementForRequestPage";
import { DocumentUploadPage } from "../../../../../pages/citizen/caseView/requestMoreTime/documentUploadPage";
import { SupportingDocumentsPage } from "../../../../../pages/citizen/caseView/requestMoreTime/supportingDocumentsPage";
import { SupportingDocumentUploadPage } from "../../../../../pages/citizen/caseView/requestMoreTime/supportingDocumentUploadPage";
import { UrgentRequestPage } from "../../../../../pages/citizen/caseView/requestMoreTime/urgentRequestPage";
import { CheckAnswersApplicantPage } from "../../../../../pages/citizen/caseView/requestMoreTime/checkAnswersApplicantPage";
import { applicationSubmittedBy } from "../../../../../common/types";
import { Selectors } from "../../../../../common/selectors";
import { ListOfApplications1Content } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/listOfApplications1Content";

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
      isManualSOA: false,
    });
    await page.click(UniqueSelectors.requestToCourtAboutYourCase);
    await page
      .locator(
        `${Selectors.GovukLink}:has-text("${ListOfApplications1Content.formLink}")`,
      )
      .nth(1)
      .click();
    await GuidanceApplicantPage.guidanceApplicantPage(page, accessibilityTest);
    await UploadYourApplicationPage.uploadYourApplicationPage(
      page,
      accessibilityTest,
      completedForm,
    );
    await AgreementForRequestPage.agreementForRequestPage(
      page,
      accessibilityTest,
      agreementForRequest,
    );
    await DocumentUploadPage.documentUploadPage(page, accessibilityTest);
    await SupportingDocumentsPage.supportingDocumentsPage(
      page,
      accessibilityTest,
      supportingDocuments,
    );
    await SupportingDocumentUploadPage.supportingDocumentUploadPage(
      page,
      accessibilityTest,
    );
    await UrgentRequestPage.urgentRequestPage(
      page,
      accessibilityTest,
      reasonUrgentRequest,
    );
    await CheckAnswersApplicantPage.checkAnswersApplicantPage(
      page,
      accessibilityTest,
    );
  }
}
