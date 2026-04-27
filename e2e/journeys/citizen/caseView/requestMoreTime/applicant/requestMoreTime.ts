import { Page } from "@playwright/test";
import { GuidanceApplicantPage } from "../../../../../pages/citizen/caseView/requestMoreTime/guidanceApplicantPage.ts";
import { UploadYourApplicationPage } from "../../../../../pages/citizen/caseView/requestMoreTime/uploadYourApplicationPage.ts";
import { AgreementForRequestPage } from "../../../../../pages/citizen/caseView/requestMoreTime/agreementForRequestPage.ts";
import { DocumentUploadPage } from "../../../../../pages/citizen/caseView/requestMoreTime/documentUploadPage.ts";
import { SupportingDocumentsPage } from "../../../../../pages/citizen/caseView/requestMoreTime/supportingDocumentsPage.ts";
import { SupportingDocumentUploadPage } from "../../../../../pages/citizen/caseView/requestMoreTime/supportingDocumentUploadPage.ts";
import { UrgentRequestPage } from "../../../../../pages/citizen/caseView/requestMoreTime/urgentRequestPage.ts";
import { CheckAnswersApplicantPage } from "../../../../../pages/citizen/caseView/requestMoreTime/checkAnswersApplicantPage.ts";
import { ListOfApplications1Content } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/listOfApplications1Content.ts";
import { HelpWithFeesPage } from "../../../../../pages/citizen/caseView/requestMoreTime/helpWithFeesPage.ts";
import { ReferencePage } from "../../../../../pages/citizen/caseView/requestMoreTime/referencePage.ts";
import { ApplicationSubmittedPage } from "../../../../../pages/citizen/caseView/requestMoreTime/applicationSubmittedPage.ts";

interface requestMoreTimeParams {
  page: Page;
  accessibilityTest: boolean;
  completedForm: boolean;
  agreementForRequest: boolean;
  supportingDocuments: boolean;
  reasonUrgentRequest: boolean;
  helpWithFees: boolean;
  hasHelpWithFeesRefNumber: true;
}

enum UniqueSelectors {
  requestToCourtAboutYourCase = "#requestToCourtAboutYourCase",
  requestMoreTimeC2ApplicationLink = "#accordion-default-content-2",
}

export class RequestMoreTime {
  public static async requestMoreTime({
    page,
    accessibilityTest,
    completedForm,
    agreementForRequest,
    supportingDocuments,
    reasonUrgentRequest,
    helpWithFees,
    hasHelpWithFeesRefNumber,
  }: requestMoreTimeParams): Promise<void> {
    await page.locator(UniqueSelectors.requestToCourtAboutYourCase).click();
    await page
      .locator(UniqueSelectors.requestMoreTimeC2ApplicationLink)
      .getByRole("link", { name: ListOfApplications1Content.formLink })
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
    await HelpWithFeesPage.helpWithFeesPage(
      page,
      accessibilityTest,
      helpWithFees,
    );
    await ReferencePage.referencePage(
      page,
      accessibilityTest,
      hasHelpWithFeesRefNumber,
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
    await ApplicationSubmittedPage.applicationSubmittedPage(
      page,
      accessibilityTest,
    );
  }
}
