import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { C100TypeOfApplication } from "../../../../journeys/manageCases/createCase/C100TypeOfApplication/C100TypeOfAplication.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case type of application tests", (): void => {
  test(`Complete the C100 type of application event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  saying yes to all options, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100TypeOfApplication.c100TypeOfApplication({
      page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      yesNoC100TypeOfApplication: true,
      typeOfChildArrangementOrder: "Spend time with order",
      permissionSelection: "Yes",
      subJourney: true,
    });
  });

  test(`Complete the C100 type of application event as a solicitor with the following options:
  Not Accessibility testing,
  No Error message testing,
  Saying No to all options, @regression`, async ({ page }): Promise<void> => {
    await C100TypeOfApplication.c100TypeOfApplication({
      page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      yesNoC100TypeOfApplication: false,
      typeOfChildArrangementOrder: "Spend time with order",
      permissionSelection: "No, permission now sought",
      subJourney: true,
    });
  });
});

test(`C100 type of application event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options with Yes for permission, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100TypeOfApplication.c100TypeOfApplication({
    page,
    user: "solicitor",
    accessibilityTest: true,
    errorMessaging: false,
    yesNoC100TypeOfApplication: true,
    typeOfChildArrangementOrder: "Spend time with order",
    permissionSelection: "Yes",
    subJourney: true,
  });
});

test(`C100 type of application event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options and No, permission is not required, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100TypeOfApplication.c100TypeOfApplication({
    page,
    user: "solicitor",
    accessibilityTest: true,
    errorMessaging: false,
    yesNoC100TypeOfApplication: false,
    typeOfChildArrangementOrder: "Spend time with order",
    permissionSelection: "No, permission is not required",
    subJourney: true,
  });
});

test(`C100 type of application event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options and No, permission now sought, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100TypeOfApplication.c100TypeOfApplication({
    page,
    user: "solicitor",
    accessibilityTest: true,
    errorMessaging: false,
    yesNoC100TypeOfApplication: false,
    typeOfChildArrangementOrder: "Spend time with order",
    permissionSelection: "No, permission now sought",
    subJourney: true,
  });
});
