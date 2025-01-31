import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100RespondentDetails } from "../../../../journeys/manageCases/createCase/C100RespondentDetails/C100RespondentDetails";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case as a solicitor - respondent details tests", (): void => {
  test(`Complete the C100 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the respondent Gender to male. @regression`, async ({
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
  Setting the respondent Gender to female. @regression`, async ({
    page,
  }): Promise<void> => {
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
  Setting the respondent Gender to other. @regression`, async ({
    page,
  }): Promise<void> => {
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

test(`C100 respondent details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the respondent Gender to female. @accessibility @nightly`, async ({
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
