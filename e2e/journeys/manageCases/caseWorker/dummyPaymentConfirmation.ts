import { Page } from "@playwright/test";
import { C100 } from "../createCase/C100";
import { Helpers } from "../../../common/helpers";
import { DummyPaymentConfirmationPage } from "../../../pages/manageCases/caseWorker/dummyPaymentConfirmationPage";

interface DummyPaymentConfirmationParams {
  page: Page;
  accessibilityTest: boolean;
}

export class DummyPaymentConfirmation {
  public static async dummyPaymentConfirmation({
    page,
    accessibilityTest,
  }: DummyPaymentConfirmationParams): Promise<void> {
    // submit a case before dummy payment confirmation journey
    await C100.c100({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoC100TypeOfApplication: false,
      typeOfChildArrangementOrder: "Spend time with order",
      selectionC100TypeOfApplication: "No, permission now sought",
      yesNoHearingUrgency: false,
      yesNoApplicantDetails: false,
      applicantGender: "female",
      yesNoRespondentDetails: false,
      respondentGender: "female",
      respondentAddress5Years: "no",
      respondentLegalRepresentation: "no",
      yesNoOtherPeopleInTheCase: false,
      c100ChildGender: "female",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "no",
      otherChildPresent: true,
      otherChildGender: "Female",
      otherChildDOBKnown: true,
      applicantChildRelationship: "Mother",
      childLiveWithApplicant: false,
      yesNoChildrenAndRespondents: false,
      yesNoChildrenAndOtherPeople: false,
      c100YesNoAllegationsOfHarm: false,
      c100DomesticAbuseTypePage3: "Financial abuse",
      c100AttendingTheHearingYesNo: false,
      C100MiamPolicyUpgrade1PageType: "yesExemption",
      yesNoMiamPolicyUpgrade: false,
      miamSelection: "initiatedMIAMBeforeProceedings_MIAMCertificate",
      yesNoInternationalElement: false,
      yesNoLitigationCapacity: false,
      c100OtherProceedings: "No",
      WelshPageRequirementType: "english",
      yesNoWelshLanguage: false,
      c100YesNoToAll: false,
      yesNoHelpWithFees: false,
    });
    await Helpers.chooseEventFromDropdown(page, "Dummy Payment confirmation");
    await DummyPaymentConfirmationPage.dummyPaymentConfirmationPage(
      page,
      accessibilityTest,
    );
  }
}
