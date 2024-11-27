import { test } from "@playwright/test";
import { C100ChildAndRespondents } from "../../../../journeys/manageCases/createCase/C100ChildrenAndRespondents/c100ChildrenAndRespondents";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case Children and respondents Tests", (): void => {
  test(`Complete the C100 Create case Children and respondents as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      yesNoRespondentDetails: true,
      respondentGender: "male",
      respondentAddress5Years: "yes",
      respondentLegalRepresentation: "yes",
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
      yesNoChildrenAndRespondents: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case Children and respondents as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the applicant Gender to female. @regression @nightly`, async ({ page }): Promise<void> => {
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoRespondentDetails: true,
      respondentGender: "male",
      respondentAddress5Years: "yes",
      respondentLegalRepresentation: "yes",
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
      yesNoChildrenAndRespondents: false,
      subJourney: true,
    });
  });
});

test(`Complete the C100 Create case Children and respondents as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying Yes to all options,
  Setting the applicant Gender to female. @accessibility`, async ({
  page,
}): Promise<void> => {
  await C100ChildAndRespondents.c100ChildrenAndRespondents({
    page: page,
    user: "solicitor",
    accessibilityTest: false,
    errorMessaging: false,
    yesNoRespondentDetails: true,
    respondentGender: "female",
    respondentAddress5Years: "yes",
    respondentLegalRepresentation: "yes",
    c100ChildGender: "female",
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
    yesNoChildrenAndRespondents: false,
    subJourney: true,
  });
});
