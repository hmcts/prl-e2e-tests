import { APIRequestContext, request, test as setup } from "@playwright/test";
import { getAccessToken } from "../common/getAccessTokenHelper";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config";

setup("Setup solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "solicitor",
    config.manageCasesBaseURL,
  );
});

setup("Retrieve bearer token for citizen user creation", async () => {
  const apiContext: APIRequestContext = await request.newContext();
  const token = await getAccessToken("citizenCreateUser", apiContext);
  if (!token) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  process.env.CITIZEN_CREATE_USER_BEARER_TOKEN = token;
});

setup("Setup judge user", async ({ page }) => {
  await IdamLoginHelper.signInUser(page, "judge", config.manageCasesBaseURL);
});

setup("Setup caseWorker user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "caseWorker",
    config.manageCasesBaseURL,
  );
});

setup("Setup Stoke court admin user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "courtAdminStoke",
    config.manageCasesBaseURL,
  );
});
