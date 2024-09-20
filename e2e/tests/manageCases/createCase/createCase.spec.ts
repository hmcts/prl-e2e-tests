import { test } from "@playwright/test";
import { C100 } from "../../../journeys/manageCases/createCase/C100";
import { FL401 } from "../../../journeys/manageCases/createCase/FL401";

test.describe("Manage cases case solicitor create case tests. @manageCases", (): void => {
  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all hearing urgency questions,
  Saying yes to all applicant details questions with a male applicant
  Saying yes to all respondent details questions with a female respondent @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100.c100({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      typeOfChildArrangementOrder: "Spend time with order",
      yesNoC100TypeOfApplication: true,
      selectionC100TypeOfApplication: "Yes",
      errorMessaging: false,
      yesNoHearingUrgency: true,
      yesNoApplicantDetails: true,
      applicantGender: "male",
      yesNoRespondentDetails: true,
      respondentGender: "male",
      respondentAddress5Years: "yes",
      yesNoOtherPeopleInTheCase: true,
      respondentLegalRepresentation: "yes",
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
    });
  });

  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all hearing urgency questions,
  Saying no to all applicant details questions with a female applicant
  Saying yes to all respondent details questions with a female respondent @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
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
    });
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Male applicant,
  Saying yes to all Respondent details questions,
  Saying yes to all Type of application questions
  Saying yes to applicant details questions,
  Saying yes to all Without Notice Order questions @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401.fl401({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: true,
      respondentDetailsAllOptionsYes: true,
      applicantHasChildren: true,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "male",
      isWithoutNoticeDetailsYes: true,
      isWithoutNoticeDetailsBailConditions: "Yes",
      otherProceedingsRadios: "Yes",
    });
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Male applicant,
  Saying yes to all Respondent details questions,
  Saying yes to all Type of application questions
  Saying yes to applicant details questions,
  Saying yes to Without Notice Order questions,
  Saying "Don't know" to Without Notice Order bail conditions`, async ({
    page,
  }): Promise<void> => {
    await FL401.fl401({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: true,
      respondentDetailsAllOptionsYes: true,
      applicantHasChildren: true,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "male",
      isWithoutNoticeDetailsYes: true,
      isWithoutNoticeDetailsBailConditions: "Don't know",
      otherProceedingsRadios: "Yes",
    });
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Female applicant,
  Saying no to all Respondent details questions,
  Saying no to all Type of application questions,
  Saying no to Without Notice Order questions`, async ({
    page,
  }): Promise<void> => {
    await FL401.fl401({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: false,
      respondentDetailsAllOptionsYes: false,
      applicantHasChildren: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "female",
      isWithoutNoticeDetailsYes: false,
      isWithoutNoticeDetailsBailConditions: "No",
      otherProceedingsRadios: "Yes",
    });
  });
});
