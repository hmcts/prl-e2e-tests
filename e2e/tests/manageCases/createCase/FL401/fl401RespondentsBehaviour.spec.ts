import { test } from "@playwright/test";
import { FL401RespondentsBehaviour } from "../../../../journeys/manageCases/createCase/FL401RespondentsBehaviour/FL401RespondentsBehaviour";

test.describe("FL401 Create case respondent’s behaviour tests @manageCases", (): void => {
  test(`Complete the FL401 respondent’s behaviour event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      respondentsBehaviourAllOptionsYes: true,
      subJourney: true,
    });
  });

  test(`Complete the FL401 respondent’s behaviour event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,`, async ({ page }): Promise<void> => {
    await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      respondentsBehaviourAllOptionsYes: false,
      subJourney: true,
    });
  });

  test(`Complete the FL401 respondent’s behaviour event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      respondentsBehaviourAllOptionsYes: true,
      subJourney: true,
    });
  });
});

test(`Accessibility test the FL401 respondent’s behaviour event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    respondentsBehaviourAllOptionsYes: true,
    subJourney: true,
  });
});
