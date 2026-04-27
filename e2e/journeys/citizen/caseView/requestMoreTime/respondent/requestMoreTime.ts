import { Page } from "@playwright/test";
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
import { ListOfApplications1Content } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/listOfApplications1Content.ts";
import { ApplicationSubmittedPage } from "../../../../../pages/citizen/caseView/requestMoreTime/applicationSubmittedPage.ts";

interface requestMoreTimeParams {
  page: Page;
  accessibilityTest: boolean;
  completedForm: boolean;
  agreementForRequest: boolean;
  helpWithFees: boolean;
  haveRefNumber: boolean;
  supportingDocuments: boolean;
  reasonUrgentRequest: boolean;
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
    helpWithFees,
    haveRefNumber,
    supportingDocuments,
    reasonUrgentRequest,
  }: requestMoreTimeParams): Promise<void> {
    await page.locator(UniqueSelectors.requestToCourtAboutYourCase).click();
    await page
      .locator(UniqueSelectors.requestMoreTimeC2ApplicationLink)
      .getByRole("link", { name: ListOfApplications1Content.formLink })
      .click();
    await GuidanceRespondentPage.guidanceRespondentPage(
      page,
      accessibilityTest,
    );
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
    await ReferencePage.referencePage(page, accessibilityTest, haveRefNumber);
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
    await CheckAnswersRespondentPage.checkAnswersRespondentPage(
      page,
      accessibilityTest,
    );
    await ApplicationSubmittedPage.applicationSubmittedPage(
      page,
      accessibilityTest,
    );
  }
}
