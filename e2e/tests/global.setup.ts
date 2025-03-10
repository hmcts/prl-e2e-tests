import { APIRequestContext, request, test as setup } from "@playwright/test";
import dotenv from "dotenv";
import { getAccessToken } from "../common/caseHelpers/getAccessTokenHelper.ts";
import IdamLoginHelper from "../common/userHelpers/idamLoginHelper.ts";
import config from "../config";

dotenv.config();

setup("Retrieve bearer token for user creation", async () => {
  // retrieve bearer token for user creation
  const apiContext = await request.newContext();
  const userCreationToken = await getAccessToken("createUser", apiContext);

  if (!userCreationToken) {
    throw new Error(
      "Setup failed: Unable to retrieve bearer token for user creation.",
    );
  }
  //set user token as an environment variable to be used elsewhere
  process.env.CREATE_USER_IDAM_BEARER_TOKEN = userCreationToken;
});

setup("Retrieve bearer token for courtNav DA case creation", async () => {
  const apiContextDaCreateCase: APIRequestContext = await request.newContext();
  const tokenDaCreateCase = await getAccessToken(
    "daCourtNavCreateCase",
    apiContextDaCreateCase,
  );
  if (!tokenDaCreateCase) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  process.env.COURTNAV_CREATE_CASE_BEARER_TOKEN = tokenDaCreateCase;
});

setup("Setup judge user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "judge",
    config.manageCasesBaseURLCase,
  );
});

setup("Setup case manager user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "caseManager",
    config.manageCasesBaseURLCase,
  );
});

setup("Setup caseWorker user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "caseWorker",
    config.manageCasesBaseURLCase,
  );
});

setup("Setup Stoke court admin user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "courtAdminStoke",
    config.manageCasesBaseURLCase,
  );
});
