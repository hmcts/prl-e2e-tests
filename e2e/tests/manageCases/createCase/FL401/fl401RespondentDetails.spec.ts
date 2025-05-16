import { test } from "@playwright/test";
import Config from "../../../../utils/config";
import { FL401RespondentDetails } from "../../../../journeys/manageCases/createCase/FL401RespondentDetails/FL401RespondentDetails";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case respondent details tests", (): void => {
  test(`Complete the FL401 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @regression`, async ({ page }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      respondentDetailsAllOptionsYes: true,
      subJourney: true,
    });
  });

  test(`Complete the FL401 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options, @regression`, async ({ page }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      respondentDetailsAllOptionsYes: false,
      subJourney: true,
    });
  });

  test(`Complete the FL401 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      respondentDetailsAllOptionsYes: true,
      subJourney: true,
    });
  });
});

test(`FL401 respondent details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
Saying yes to all options, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await FL401RespondentDetails.fl401RespondentDetails({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    respondentDetailsAllOptionsYes: true,
    subJourney: true,
  });
});
