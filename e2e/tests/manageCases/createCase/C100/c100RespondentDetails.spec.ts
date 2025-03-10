import { test } from "@playwright/test";
import { C100RespondentDetails } from "../../../../journeys/manageCases/createCase/C100RespondentDetails/C100RespondentDetails";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case respondent details tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });
  test(`Complete the C100 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the respondent Gender to male. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      accessibilityTest: false,
      yesNoRespondentDetailsC100: true,
      respondentGender: "male",
      respondentAddress5Years: "yes",
      respondentLegalRepresentation: "yes",
    });
  });

  test(`Complete the C100 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the respondent Gender to female. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      accessibilityTest: false,
      yesNoRespondentDetailsC100: false,
      respondentGender: "male",
      respondentAddress5Years: "no",
      respondentLegalRepresentation: "no",
    });
  });

  test(`Complete the C100 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options apart from don't know fields,
  Setting the respondent Gender to other. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      accessibilityTest: false,
      yesNoRespondentDetailsC100: false,
      respondentGender: "other",
      respondentAddress5Years: "dontKnow",
      respondentLegalRepresentation: "dontKnow",
    });
  });
});

test(`C100 respondent details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the respondent Gender to female. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100RespondentDetails.c100RespondentDetails({
    page: page,
    accessibilityTest: true,
    yesNoRespondentDetailsC100: true,
    respondentGender: "female",
    respondentAddress5Years: "yes",
    respondentLegalRepresentation: "yes",
  });
});
