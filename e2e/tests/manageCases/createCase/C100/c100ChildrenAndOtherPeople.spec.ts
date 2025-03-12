import { test } from "@playwright/test";
import { C100ChildrenAndOtherPeople } from "../../../../journeys/manageCases/createCase/C100ChildrenAndOtherPeople/c100ChildrenAndOtherPeople";
import { C100ChildDetails } from "../../../../journeys/manageCases/createCase/C100ChildDetails/c100ChildDetails.ts";
import { C100OtherPeopleInTheCase } from "../../../../journeys/manageCases/createCase/C100OtherPeopleInTheCase/C100OtherPeopleInTheCase.ts";
import { C100ApplicantDetails } from "../../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails.ts";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case Children and respondents Tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoApplicantDetails: true,
      applicantGender: "male",
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      accessibilityTest: false,
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
    });
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      yesNoOtherPeopleInTheCase: true,
      otherPersonLivesInRefuge: true,
      applicantGender: "male",
    });
  });
  test(`Complete the C100 Create case Children and Other people as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndOtherPeople.c100ChildrenAndOtherPeople({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      yesNoOtherPeopleInTheCase: true,
      otherPersonLivesInRefuge: false,
      applicantGender: "male",
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
      yesNoChildrenAndOtherPeople: true,
      subJourney: true,
    });
  });
  test(`Complete the C100 Create case Children and Other people as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the applicant Gender to female. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndOtherPeople.c100ChildrenAndOtherPeople({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoOtherPeopleInTheCase: false,
      otherPersonLivesInRefuge: false,
      applicantGender: "female",
      c100ChildGender: "female",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "no",
      yesNoChildrenAndOtherPeople: false,
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case Children and Other people as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Saying Yes to all options,
    Setting the applicant Gender to Other. @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100ChildrenAndOtherPeople.c100ChildrenAndOtherPeople({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      errorMessaging: false,
      yesNoOtherPeopleInTheCase: true,
      otherPersonLivesInRefuge: false,
      applicantGender: "male",
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
      yesNoChildrenAndOtherPeople: true,
      subJourney: true,
    });
  });
});
