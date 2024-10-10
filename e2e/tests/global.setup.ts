import { test as setup } from "@playwright/test";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config";

setup("Setup", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "solicitor",
    config.manageCasesBaseURL,
  );
  await IdamLoginHelper.signInUser(
    page,
    "citizen",
    config.citizenFrontendBaseURL,
  );
});
