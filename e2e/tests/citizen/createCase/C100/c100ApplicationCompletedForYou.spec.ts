import { APIRequestContext, test } from "@playwright/test";
import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import IdamLoginHelper from "../../../../common/idamLoginHelper";
import {
  initializeAPIContext,
  getAccessToken,
} from "../../../../common/idamCreateCitizenUserApiHelper"; // Adjust import path as necessary

test.describe("Create Citizen Application but choose to have legal representative fill it out for you. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  let apiContext: APIRequestContext;
  let token: string;
  test.beforeAll(async () => {
    apiContext = await initializeAPIContext();
    token = await getAccessToken(apiContext);
  });
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
      token,
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
  test(
    "Application completed for you with the following options:" +
      "No error messaging." +
      "Yes accessibility Testing" +
      "@accessibilityCitizenFrontend",
    async ({ page }): Promise<void> => {
      await C100.c100ApplicationCompletedForYou({
        page: page,
        accessibilityTest: true,
        errorMessaging: false,
      });
    },
  );
});
