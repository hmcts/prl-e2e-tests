import { test } from "@playwright/test";
import Config from "../../../config";
import { C100 } from "../../../journeys/manageCases/createCase/C100";
import { FL401 } from "../../../journeys/manageCases/createCase/FL401";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Manage cases case solicitor create case tests.", (): void => {
  // Triple timeout for these slow tests
  test.slow();

  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all hearing urgency questions,
  Saying yes to all applicant details questions with a male applicant
  Saying yes to all respondent details questions with a female respondent
  Saying yes to all other people in the case questions with a male applicant
  Saying yes to other person lives in refuge
  Saying yes to all child details question with a male child
  Saying yes to all children and respondents questions
  Saying yes to all attending the hearing options
  Saying Yes to all International element options
  Saying yes to all Litigation Capacity option
  Saying yes to other proceedings and ongoing proceedings
  With no other child present
  Where the child lives with their applicant father,
  With no other child present
  Setting the allegations of harm to Physical
  Saying no to all Miam
  C100MiamPolicyUpgrade1PageType is "yesExemption"
  Setting WelshPageRequirementType to "english"
  Saying yes to all WelshRequirement options @regression @smoke`, async ({
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
      otherPersonLivesInRefuge: true,
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
      c100YesNoAllegationsOfHarm: true,
      c100DomesticAbuseTypePage3: "Physical abuse",
      c100AttendingTheHearingYesNo: true,
      C100MiamPolicyUpgrade1PageType: "yesAttendedMiam",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
      yesNoInternationalElement: true,
      yesNoLitigationCapacity: true,
      c100OtherProceedings: "Yes",
      c100OngoingProceedingsAndDocX: true,
      WelshPageRequirementType: "english",
      yesNoWelshLanguage: true,
      c100YesNoToAll: true,
      yesNoHelpWithFees: false,
    });
  });

  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all hearing urgency questions,
  Saying no to all applicant details questions with a female applicant
  Saying yes to all respondent details questions with a female respondent
  With another female child present, with a known DOB
  Where the child does not live with their applicant mother
  Saying no to all respondent details questions with a female respondent
  Saying no to all other people in the case questions with a male applicant
  Saying no to all child details question with a female child
  Saying no to all children and respondents questions
  Setting the allegations of harm to none.
  Saying no to all attending the hearing questions
  Saying no to all Miam
  Saying no to all International element options
  Saying no to all children and respondents questions
  Saying no to all Litigation Capacity options
  Setting WelshPageRequirementType to "english"
  Saying no to all WelshRequirement options
  C100MiamPolicyUpgrade1PageType is "yesExemption"
  Saying Don't know to other proceedings
  @regression @nightly`, async ({ page }): Promise<void> => {
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
      otherPersonLivesInRefuge: false,
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
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
     Not Accessibility testing,
     Not Error message testing,
     Female applicant,
     Saying yes to all Respondent details questions,
     Saying yes to all Type of application questions,
     Saying yes to applicant details questions,
     Saying yes to respondents behaviour questions,
     Saying yes to other proceedings
     Saying yes to all Without Notice Order questions,
     Relationship is 'Formerly lived together as a couple'
     Saying yes to all 'The Home' Questions,
     'Yes, both of them' ever lived at the address
     Saying Yes to all attending the hearing question,
     Upload document files,
    Submit Statement of Truth
    @regression`, async ({ page }): Promise<void> => {
    await FL401.fl401({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: true,
      respondentDetailsAllOptionsYes: true,
      applicantHasChildren: true,
      yesNoFL401ApplicantDetails: true,
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
      viewPdfTestCases: "1",
      fl401YesNoToEverything: true,
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
     Saying "Don't know" to other proceedings
     Saying yes to all Type of application questions,
     Saying yes to applicant details questions,
     Saying yes to Without Notice Order questions,
     Saying "Don't know" to Without Notice Order bail conditions,
     Saying yes to all 'The Home' booleans,
     'Yes, applicant' to has the applicant or respondent ever lived at the home address,
     Relationship is 'Married or in a civil partnership',
     Saying yes to all attending the hearing questions,
     upload document files
  @regression `, async ({ page }): Promise<void> => {
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
      otherProceedingsRadios: "Don't know",
      relationshipToRespondent: "marriedOrCivil",
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesApplicant",
      fl401AttendingTheHearingYesNo: true,
      welshLanguageRequirementsAllOptionsYes: true,
      welshLanguageRequirementsSelectWelsh: false,
      viewPdfTestCases: "2",
      fl401YesNoToEverything: true,
    });
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Female applicant,
  Saying no to all Respondent details questions,
  Saying no to all Type of application questions,
  Saying no to respondents behaviour questions,
  Saying No to Other Proceedings
  Saying no to Without Notice Order questions,
  Relationship is 'None of the above',
  Other Relationship Is: 'Cousin',
  upload document files,
  Saying no to applicant details questions
  Saying 'No' to ever lived at the home address,
  Saying 'No' to ever intend to live at home address
  Other Relationship Is: 'Cousin'
  saying no to all attending the hearing questions
  Submit statement of truth @regression`, async ({ page }): Promise<void> => {
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
      otherProceedingsRadios: "No",
      relationshipToRespondent: "noneOfTheAbove",
      relationshipToRespondentOther: "Cousin",
      fl401TheHomeYesNo: false,
      fl401EverLivedAtAddress: "No",
      fl401IntendToLiveAtAddress: "No",
      fl401AttendingTheHearingYesNo: false,
      welshLanguageRequirementsAllOptionsYes: false,
      viewPdfTestCases: "3",
      fl401YesNoToEverything: false,
    });
  });
});
