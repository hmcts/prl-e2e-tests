import { test } from "@playwright/test";
import { C100TypeOfApplication } from "../../../../journeys/manageCases/createCase/C100TypeOfApplication/C100TypeOfAplication";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case type of application tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });
  test(`Complete the C100 type of application event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  saying yes to all options, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100TypeOfApplication.c100TypeOfApplication({
      page,
      accessibilityTest: false,
      errorMessaging: true,
      yesNoC100TypeOfApplication: true,
      typeOfChildArrangementOrder: "Spend time with order",
      selectionC100TypeOfApplication: "Yes",
    });
  });

  test(`Complete the C100 type of application event as a solicitor with the following options:
  Not Accessibility testing,
  No Error message testing,
  Saying No to all options, @regression`, async ({ page }): Promise<void> => {
    await C100TypeOfApplication.c100TypeOfApplication({
      page,
      accessibilityTest: false,
      errorMessaging: true,
      yesNoC100TypeOfApplication: false,
      typeOfChildArrangementOrder: "Spend time with order",
      selectionC100TypeOfApplication: "No, permission now sought",
    });
  });

  test(`C100 type of application event as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Saying yes to all options, @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100TypeOfApplication.c100TypeOfApplication({
      page,
      accessibilityTest: true,
      errorMessaging: false,
      yesNoC100TypeOfApplication: true,
      typeOfChildArrangementOrder: "Spend time with order",
      selectionC100TypeOfApplication: "Yes",
    });
  });
});