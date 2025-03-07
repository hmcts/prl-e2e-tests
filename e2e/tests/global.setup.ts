import { APIRequestContext, request, test as setup } from "@playwright/test";
import dotenv from "dotenv";
import { getAccessToken } from "../common/caseHelpers/getAccessTokenHelper.ts";
import IdamLoginHelper from "../common/userHelpers/idamLoginHelper.ts";
import config from "../config";
import { setupUser } from "../common/userHelpers/idamCreateUserApiHelper.ts";

dotenv.config();

setup("Set up users - solicitor", async ({ page }) => {
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

  // define users and set up their accounts
  const users = ["solicitor"];
  for (const userRole of users) {
    const { email, password } = await setupUser(userCreationToken, userRole);
    const browser = page.context().browser();
    if (!browser) {
      throw new Error("Setup failed: Browser instance is null or undefined.");
    }
    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();
    await IdamLoginHelper.signIn(
      userPage,
      email,
      password,
      config.manageCasesBaseURL,
      userRole,
    );
  }
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
