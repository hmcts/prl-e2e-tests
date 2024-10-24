import { test as setup } from "@playwright/test";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config";

setup("Setup solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "solicitor",
    config.manageCasesBaseURL,
  );
});

setup("Setup citizen user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "citizen",
    config.citizenFrontendBaseURL,
  );
});
