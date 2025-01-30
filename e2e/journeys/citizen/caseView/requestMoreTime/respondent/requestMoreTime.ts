import { ActivateCase, CaseUser } from "../../../activateCase/activateCase.ts";
import { Browser, Page } from "@playwright/test";
import { GuidanceRespondentPage } from "../../../../../pages/citizen/caseView/requestMoreTime/guidanceRespondentPage.ts";
import { UploadYourApplicationPage } from "../../../../../pages/citizen/caseView/requestMoreTime/uploadYourApplicationPage.ts";
import { AgreementForRequestPage } from "../../../../../pages/citizen/caseView/requestMoreTime/agreementForRequestPage.ts";
import { HelpWithFeesPage } from "../../../../../pages/citizen/caseView/requestMoreTime/helpWithFeesPage.ts";
import { ReferencePage } from "../../../../../pages/citizen/caseView/requestMoreTime/referencePage.ts";
import { DocumentUploadPage } from "../../../../../pages/citizen/caseView/requestMoreTime/documentUploadPage.ts";
import { SupportingDocumentsPage } from "../../../../../pages/citizen/caseView/requestMoreTime/supportingDocumentsPage.ts";
import { SupportingDocumentUploadPage } from "../../../../../pages/citizen/caseView/requestMoreTime/supportingDocumentUploadPage.ts";
import { UrgentRequestPage } from "../../../../../pages/citizen/caseView/requestMoreTime/urgentRequestPage.ts";
import { CheckAnswersRespondentPage } from "../../../../../pages/citizen/caseView/requestMoreTime/checkAnswersRespondentPage.ts";
import { applicationSubmittedBy } from "../../../../../common/types.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ListOfApplications1Content } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/listOfApplications1Content.ts";

interface requestMoreTimeParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
  completedForm: boolean;
  agreementForRequest: boolean;
  helpWithFees: boolean;
  haveRefNumber: boolean;
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
    helpWithFees,
    haveRefNumber,
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
    await page.locator(`${Selectors.GovukLink}:has-text("${ListOfApplications1Content.formLink}")`).nth(1).click();
    await GuidanceRespondentPage.guidanceRespondentPage(page, accessibilityTest);
    await UploadYourApplicationPage.uploadYourApplicationPage(page, accessibilityTest, completedForm);
    await AgreementForRequestPage.agreementForRequestPage(page, accessibilityTest, agreementForRequest);
    await HelpWithFeesPage.helpWithFeesPage(page, accessibilityTest, helpWithFees);
    await ReferencePage.referencePage(page, accessibilityTest, haveRefNumber);
    await DocumentUploadPage.documentUploadPage(page, accessibilityTest);
    await SupportingDocumentsPage.supportingDocumentsPage(page, accessibilityTest, supportingDocuments);
    await SupportingDocumentUploadPage.supportingDocumentUploadPage(page, accessibilityTest);
    await UrgentRequestPage.urgentRequestPage(page, accessibilityTest, reasonUrgentRequest);
    await CheckAnswersRespondentPage.checkAnswersRespondentPage(page, accessibilityTest);
  }
}
