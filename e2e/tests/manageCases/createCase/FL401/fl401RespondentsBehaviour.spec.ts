import { test } from "@playwright/test";
import Config from "../../../../config";
import { FL401RespondentsBehaviour } from "../../../../journeys/manageCases/createCase/FL401RespondentsBehaviour/FL401RespondentsBehaviour";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case respondent’s behaviour tests", (): void => {
  test(`Complete the FL401 respondent’s behaviour event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing @regression`, async ({ page }): Promise<void> => {
    await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
      page: page,
      accessibilityTest: false,
      subJourney: true,
    });
  });
});

test(`FL401 respondent’s behaviour event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
    page: page,
    accessibilityTest: true,
    subJourney: true,
  });
});
