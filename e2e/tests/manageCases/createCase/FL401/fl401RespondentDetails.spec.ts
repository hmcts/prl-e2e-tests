import { test } from "@playwright/test";
import { FL401RespondentDetails } from "../../../../journeys/manageCases/createCase/FL401RespondentDetails/FL401RespondentDetails";

test.describe("FL401 Create case respondent details tests @manageCases", (): void => {
  test(`Complete the FL401 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails(
      page,
      false,
      false,
      true,
    );
  });

  test(`Complete the FL401 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,`, async ({ page }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails(
      page,
      false,
      false,
      false,
    );
  });

  test(`Complete the FL401 respondent details event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401RespondentDetails.fl401RespondentDetails(
      page,
      false,
      true,
      true,
    );
  });
});

test(`Accessibility test the FL401 respondent details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await FL401RespondentDetails.fl401RespondentDetails(page, true, false, true);
});
