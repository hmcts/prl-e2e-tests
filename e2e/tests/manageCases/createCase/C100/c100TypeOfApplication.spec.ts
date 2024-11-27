import { test } from "@playwright/test";
import { C100TypeOfApplication } from "../../../../journeys/manageCases/createCase/C100TypeOfApplication/C100TypeOfAplication";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case type of application tests @manageCases", (): void => {
  test(`Complete the C100 type of application event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  saying yes to all options, @crossbrowserManageCases @errorMessageManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100TypeOfApplication.c100TypeOfApplication({
      page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      yesNoC100TypeOfApplication: true,
      typeOfChildArrangementOrder: "Spend time with order",
      selectionC100TypeOfApplication: "Yes",
      subJourney: true,
    });
  });

  test(`Complete the C100 type of application event as a solicitor with the following options:
  Not Accessibility testing,
  No Error message testing,
  Saying No to all options, @crossbrowserManageCases @manageCasesNightlyPipeline`, async ({
    page,
  }): Promise<void> => {
    await C100TypeOfApplication.c100TypeOfApplication({
      page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      yesNoC100TypeOfApplication: false,
      typeOfChildArrangementOrder: "Spend time with order",
      selectionC100TypeOfApplication: "No, permission now sought",
      subJourney: true,
    });
  });
});

test(`Accessibility test the C100type of application event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await C100TypeOfApplication.c100TypeOfApplication({
    page,
    user: "solicitor",
    accessibilityTest: true,
    errorMessaging: false,
    yesNoC100TypeOfApplication: true,
    typeOfChildArrangementOrder: "Spend time with order",
    selectionC100TypeOfApplication: "Yes",
    subJourney: true,
  });
});
