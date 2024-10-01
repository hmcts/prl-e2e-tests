import { test } from "@playwright/test";
import { C100 } from "../../../journeys/manageCases/createCase/C100";
import { FL401 } from "../../../journeys/manageCases/createCase/FL401";
import Config from "../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Manage cases case solicitor create case tests. @manageCases", (): void => {
  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all hearing urgency questions,
  Saying yes to all applicant details questions with a male applicant
  Saying yes to all respondent details questions with a female respondent 
  Saying yes to all respondent details questions with a male respondent
  Saying yes to all other people in the case questions with a male applicant
  Saying yes to all child details question with a male child 
  Saying yes to all children and respondents questions
  Saying yes to all attending the hearing options
  With no other child present
  Where the child lives with their applicant father,
  With no other child present @crossbrowserManageCases`, async ({
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
      otherChildPresent: false,
      otherChildGender: "Male",
      otherChildDOBKnown: false,
      applicantChildRelationship: "Father",
      childLiveWithApplicant: true,
      yesNoChildrenAndRespondents: true,
      yesNoChildrenAndOtherPeople: true,
      c100AttendingTheHearingYesNo: true,
    });
  });

  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all hearing urgency questions,
  Saying no to all applicant details questions with a female applicant
  Saying yes to all respondent details questions with a female respondent 
  With another female child present, with a known DOB
    With another female child present, with a known DOB 
  Where the child does not live with their applicant mother
  Saying no to all respondent details questions with a female respondent
  Saying no to all other people in the case questions with a male applicant
  Saying no to all child details question with a female child 
  Saying no to all attending the hearing questions
  Saying no to all children and respondents questions @crossbrowserManageCases`, async ({
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
      otherChildPresent: true,
      otherChildGender: "Female",
      otherChildDOBKnown: true,
      applicantChildRelationship: "Mother",
      childLiveWithApplicant: false,
      yesNoChildrenAndRespondents: false,
      yesNoChildrenAndOtherPeople: false,
      c100AttendingTheHearingYesNo: false,
    });
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Female applicant,
  Saying yes to all Respondent details questions,
  Saying yes to all Type of application questions,
  Saying yes to applicant details questions,
  Saying yes to respondents behaviour questions,
  Saying yes to all Without Notice Order questions @crossbrowserManageCases,
  Saying yes to all Without Notice Order questions, 
  Relationship is 'Formerly lived together as a couple'
  Saying yes to all 'The Home' Questions,
  'Yes, both of them' ever lived at the address 
  Saying Yes to all attending the hearing question,
  Upload document files,
  @crossbrowserManageCases`, async ({ page }): Promise<void> => {
    await FL401.fl401({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: true,
      respondentDetailsAllOptionsYes: true,
      applicantHasChildren: true,
      yesNoFL401ApplicantDetails: true,
      respondentsBehaviourAllOptionsYes: true,
      applicantGender: "female",
      isWithoutNoticeDetailsYes: true,
      isWithoutNoticeDetailsBailConditions: "Yes",
      otherProceedingsRadios: "Yes",
      relationshipToRespondent: "foremerlyLivedTogether",
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesBothOfThem",
      fl401AttendingTheHearingYesNo: true,
      welshLanguageRequirementsAllOptionsYes: true,
      welshLanguageRequirementsSelectWelsh: false,
    });
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Male applicant,
  Saying yes to all Respondent details questions,
  Saying yes to all Type of application questions
  Saying yes to applicant details questions,
  Saying yes to respondents behaviour questions,
  Saying yes to Without Notice Order questions,
  Saying "Don't know" to Without Notice Order bail conditions,
  Saying yes to all Type of application questions, 
  Saying yes to applicant details questions, 
  Saying yes to Without Notice Order questions, 
  Saying "Don't know" to Without Notice Order bail conditions, 
  Saying yes to all 'The Home' booleans, 
  'Yes, applicant' to has the applicant or respondent ever lived at the home address,
  Relationship is 'Married or in a civil partnership',
  Saying yes to all attending the hearing questions,
  upload document files
  @crossbrowserManageCases`, async ({ page }): Promise<void> => {
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
      respondentsBehaviourAllOptionsYes: true,
      isWithoutNoticeDetailsYes: true,
      isWithoutNoticeDetailsBailConditions: "Don't know",
      otherProceedingsRadios: "Yes",
      relationshipToRespondent: "marriedOrCivil",
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesApplicant",
      fl401AttendingTheHearingYesNo: true,
      welshLanguageRequirementsAllOptionsYes: true,
      welshLanguageRequirementsSelectWelsh: false,
    });
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Female applicant,
  Saying no to all Respondent details questions,
  Saying no to all Type of application questions,
  Saying no to respondents behaviour questions,
  Saying no to Without Notice Order questions,
  Saying no to Without Notice Order questions,
  Relationship is 'None of the above',
  Other Relationship Is: 'Cousin',
  upload document files,
  Saying no to applicant details questions
  Saying 'No' to ever lived at the home address, 
  Saying 'No' to ever intend to live at home address
  Other Relationship Is: 'Cousin'
  saying no to all attending the hearing questions`, async ({
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
      respondentsBehaviourAllOptionsYes: false,
      isWithoutNoticeDetailsYes: false,
      isWithoutNoticeDetailsBailConditions: "No",
      otherProceedingsRadios: "Yes",
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Cousin",
      fl401TheHomeYesNo: false,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "No",
      fl401AttendingTheHearingYesNo: false,
      welshLanguageRequirementsAllOptionsYes: false,
    });
  });
});
