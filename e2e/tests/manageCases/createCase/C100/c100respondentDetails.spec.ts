import { test } from "@playwright/test";
import { C100ApplicantDetails } from "../../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails";
import {
  C100RespondentDetails
} from "../../../../journeys/manageCases/createCase/C100RespondentDetails/C100RespondentDetails";

test.describe("C100 Create case respondent details tests @manageCases", (): void => {
  test(`Complete the C100 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      yesNoRespondentDetailsC100: true,
      respondentGender: "male",
      respondentAddress5Years: "yes",
      respondentLegalRepresentation: "yes",
      subJourney: true,
    });
  });

  test(`Complete the C100 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the applicant Gender to female.`, async ({ page }): Promise<void> => {
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      yesNoRespondentDetailsC100: false,
      respondentGender: "male",
      respondentAddress5Years: "no",
      respondentLegalRepresentation: "no",
      subJourney: true,
    });
  });

  test(`Complete the C100 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options apart from don't know fields,
  Setting the applicant Gender to other.`, async ({ page }): Promise<void> => {
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      yesNoRespondentDetailsC100: false,
      respondentGender: "other",
      respondentAddress5Years: "dontKnow",
      respondentLegalRepresentation: "dontKnow",
      subJourney: true,
    });
  });
});

test(`Accessibility test the C100 respondent details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to female. @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await C100RespondentDetails.c100RespondentDetails({
    page: page,
    user: "solicitor",
    accessibilityTest: true,
    yesNoRespondentDetailsC100: true,
    respondentGender: "female",
    respondentAddress5Years: "yes",
    respondentLegalRepresentation: "yes",
    subJourney: true,
  });
});
