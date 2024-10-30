import { test as setup } from "@playwright/test";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config";

setup("Setup solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInSolicitorUser(
    page,
    "solicitor",
    config.manageCasesBaseURL,
  );
});
