import { test } from "@playwright/test";
import IdamLoginHelper from "../../../../common/idamLoginHelper";
import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";

test.describe("Create Citizen Application but choose to have legal representative fill it out for you.", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(
    "Application completed for you with the following options:" +
      "No error messaging." +
      "No accessibility Testing @regression @nightly",
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
      "No accessibility Testing @regression @errorMessage",
    async ({ page }): Promise<void> => {
      await C100.c100ApplicationCompletedForYou({
        page: page,
        accessibilityTest: false,
        errorMessaging: true,
      });
    },
  );
});

test.describe("Testing the accessibility of the C100 Case Created for you application", (): void => {
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
      "Yes accessibility Testing @accessibility",
    async ({ page }): Promise<void> => {
      await C100.c100ApplicationCompletedForYou({
        page: page,
        accessibilityTest: true,
        errorMessaging: false,
      });
    },
  );
});
