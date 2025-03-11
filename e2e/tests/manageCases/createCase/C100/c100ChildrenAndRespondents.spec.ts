import { test } from "@playwright/test";
import { C100ChildAndRespondents } from "../../../../journeys/manageCases/createCase/C100ChildrenAndRespondents/c100ChildrenAndRespondents";
import Config from "../../../../config";
import IdamLoginHelper from "../../../../common/userHelpers/idamLoginHelper.ts";
import { C100ChildDetails } from "../../../../journeys/manageCases/createCase/C100ChildDetails/c100ChildDetails.ts";
import { C100RespondentDetails } from "../../../../journeys/manageCases/createCase/C100RespondentDetails/C100RespondentDetails.ts";
import { C100ApplicantDetails } from "../../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails.ts";

test.describe("C100 Create case Children and respondents Tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.createAndSignInUser(
      page,
      Config.manageCasesBaseURLCase,
      "solicitor",
    );
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
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      accessibilityTest: false,
      yesNoRespondentDetailsC100: true,
      respondentGender: "male",
      respondentAddress5Years: "yes",
      respondentLegalRepresentation: "yes",
    });
  });
  test(`Complete the C100 Create case Children and respondents as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      yesNoChildrenAndRespondents: true,
    });
  });

  test(`Complete the C100 Create case Children and respondents as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the applicant Gender to female. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoChildrenAndRespondents: false,
    });
  });
  test(`Complete the C100 Create case Children and respondents as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Saying Yes to all options,
    Setting the applicant Gender to female. @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoChildrenAndRespondents: false,
    });
  });
});