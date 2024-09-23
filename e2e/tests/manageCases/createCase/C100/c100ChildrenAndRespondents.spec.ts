import { test } from "@playwright/test";
import { IndividualC100ChildAndRespondents } from "../../../../journeys/manageCases/createCase/C100ChildrenAndRespondents/Individualc100ChildrenAndRespondents";

test.describe("C100 Create case Children and respondents Tests @manageCases", (): void => {
  test(`Complete the C100 Create case Children and respondents as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await IndividualC100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoRespondentDetailsC100: true,
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
  Error message testing,
  Saying no to all options,
  Setting the applicant Gender to female. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await IndividualC100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoRespondentDetailsC100: true,
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
  Setting the applicant Gender to female. @crossbrowserManageCases`, async ({
  page,
}): Promise<void> => {
  await IndividualC100ChildAndRespondents.c100ChildrenAndRespondents({
    page: page,
    user: "solicitor",
    accessibilityTest: true,
    errorMessaging: false,
    yesNoRespondentDetailsC100: true,
    respondentGender: "male",
    respondentAddress5Years: "yes",
    respondentLegalRepresentation: "yes",
    c100ChildGender: "male",
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
    yesNoChildrenAndRespondents: false,
    subJourney: true,
  });
});
