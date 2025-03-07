import { test } from "@playwright/test";
import IdamLoginHelper from "../../../../common/userHelpers/idamLoginHelper.ts";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import Config from "../../../../config.ts";

test.describe("Create Citizen Application but choose to have legal representative fill it out for you.", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.createAndSignInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(
    "Application completed for you with the following options:" +
      "No error messaging." +
      "No accessibility Testing @regression",
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

  test(
    "Application completed for you with the following options:" +
      "No error messaging." +
      "Yes accessibility Testing @accessibility @nightly",
    async ({ page }): Promise<void> => {
      await C100.c100ApplicationCompletedForYou({
        page: page,
        accessibilityTest: true,
        errorMessaging: false,
      });
    },
  );
});
