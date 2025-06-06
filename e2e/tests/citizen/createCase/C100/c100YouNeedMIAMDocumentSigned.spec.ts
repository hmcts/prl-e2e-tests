import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100.ts";
import IdamLoginHelper from "../../../../common/userHelpers/idamLoginHelper.ts";

test.describe("Create Citizen Application but you don't have a MIAM document.", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.setupAndSignInUser(
      page,
      Config.citizenFrontendBaseURL,
      "citizen",
    );
  });
  test(
    "You need to have a signed document journey signed for you, with the following options:" +
      "No error messaging." +
      "No accessibility Testing @regression",
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
      "No accessibility Testing @regression @errorMessage",
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
      "No error messaging." +
      "Yes accessibility Testing" +
      "@accessibility @nightly",
    async ({ page }): Promise<void> => {
      await C100.youNeedASignedDocument({
        page: page,
        accessibilityTest: true,
        errorMessaging: false,
      });
    },
  );
});
