import { APIRequestContext, request, test as setup } from "@playwright/test";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config";
import { getAccessToken } from "../common/getAccessTokenHelper";

setup("Setup solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInSolicitorUser(
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
