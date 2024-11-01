import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import IdamLoginHelper from "../../../../common/idamLoginHelper";

test.describe("Create Citizen Application but choose to have legal representative fill it out for you. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    // Sign in as a citizen user before each test
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(
    "Application completed for you with the following options:" +
      "No error messaging." +
      "No accessibility Testing",
    async ({ page }): Promise<void> => {
      await C100.c100ApplicationCompletedForYou({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
      });
    },
  );
  test(
    "Application completed for you with the following options:" +
      "Yes error messaging." +
      "No accessibility Testing",
    async ({ page }): Promise<void> => {
      await C100.c100ApplicationCompletedForYou({
        page: page,
        accessibilityTest: false,
        errorMessaging: true,
      });
    },
  );
});

test.describe("Testing the accessibility of the C100 Case Created for you application, @accessibilityCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    // Sign in as a citizen user before each test
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(
    "Application completed for you with the following options:" +
    "No error messaging." +
    "Yes accessibility Testing",
    async ({ page }): Promise<void> => {
      await C100.c100ApplicationCompletedForYou({
        page: page,
        accessibilityTest: true,
        errorMessaging: false,
      });
    }
  );
});

