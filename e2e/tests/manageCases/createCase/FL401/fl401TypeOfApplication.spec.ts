import { test } from "@playwright/test";
import { FL401TypeOfApplication } from "../../../../journeys/manageCases/createCase/FL401TypeOfApplication/FL401TypeOfApplication.ts";
import Config from "../../../../utils/config.utils.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case type of application tests", (): void => {
  test(`Complete the FL401 type of application event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to linked to C100, @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TypeOfApplication.fl401TypeOfApplication({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: true,
      subJourney: true,
    });
  });

  test(`Complete the FL401 type of application event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to linked to C100, @regression`, async ({
    page,
  }): Promise<void> => {
    await FL401TypeOfApplication.fl401TypeOfApplication({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: false,
      subJourney: true,
    });
  });

  test(`Complete the FL401 type of application event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to linked to C100, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401TypeOfApplication.fl401TypeOfApplication({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      isLinkedToC100: true,
      subJourney: true,
    });
  });
});

test(`Accessibility test the FL401 type of application event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to linked to C100, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await FL401TypeOfApplication.fl401TypeOfApplication({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    isLinkedToC100: true,
    subJourney: true,
  });
});
