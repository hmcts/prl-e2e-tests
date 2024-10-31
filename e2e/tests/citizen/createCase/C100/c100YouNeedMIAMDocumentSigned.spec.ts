import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import IdamLoginHelper from "../../../../common/idamLoginHelper";

test.describe("Create Citizen Application but you don't have a MIAM document. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    // Sign in as a citizen user before each test
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(
    "You need to have a signed document journey signed for you, with the following options:" +
      "No error messaging." +
      "No accessibility Testing",
    async ({ page }): Promise<void> => {
      await C100.youNeedASignedDocument({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
      });
    },
  );
  test(
    "You need to have a signed document journey signed for you, with the following options:" +
      "Yes error messaging." +
      "No accessibility Testing",
    async ({ page }): Promise<void> => {
      await C100.youNeedASignedDocument({
        page: page,
        accessibilityTest: false,
        errorMessaging: true,
      });
    },
  );
  test(
    "You need to have a signed document journey signed for you, with the following options:" +
      "No error messaging." +
      "Yes accessibility Testing" +
      "@accessibilityCitizenFrontend",
    async ({ page }): Promise<void> => {
      await C100.youNeedASignedDocument({
        page: page,
        accessibilityTest: true,
        errorMessaging: false,
      });
    },
  );
});
