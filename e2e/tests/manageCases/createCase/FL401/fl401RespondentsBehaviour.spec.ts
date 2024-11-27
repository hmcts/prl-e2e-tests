import { test } from "@playwright/test";
import { FL401RespondentsBehaviour } from "../../../../journeys/manageCases/createCase/FL401RespondentsBehaviour/FL401RespondentsBehaviour";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case respondent’s behaviour tests @manageCases", (): void => {
  test(`Complete the FL401 respondent’s behaviour event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing @crossbrowserManageCases @manageCasesNightlyPipeline`, async ({
    page,
  }): Promise<void> => {
    await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
      page: page,
      accessibilityTest: false,
      subJourney: true,
    });
  });
});

test(`Accessibility test the FL401 respondent’s behaviour event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
    page: page,
    accessibilityTest: true,
    subJourney: true,
  });
});
