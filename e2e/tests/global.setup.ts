import { APIRequestContext, request, test as setup } from "@playwright/test";
import dotenv from "dotenv";
import { getAccessToken } from "../common/caseHelpers/getAccessTokenHelper.ts";
import IdamLoginHelper from "../common/userHelpers/idamLoginHelper.ts";
import config from "../config";
import process from "node:process";

dotenv.config();

setup("Setup solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "solicitor",
    config.manageCasesBaseURLCase,
  );
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

setup("Retrieve bearer token for user creation", async () => {
  const apiContext: APIRequestContext = await request.newContext();
  const token = await getAccessToken("citizenCreateUser", apiContext);
  if (!token) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  process.env.CREATE_USER_BEARER_TOKEN = token;
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
  const userInfo = await IdamLoginHelper.setupAndSignInUser(
    page,
    config.manageCasesBaseURLCase,
    "caseWorker",
    true,
  );
  if (process.env.PWDEBUG) {
    console.log(userInfo);
  }
});

setup("Setup Stoke court admin user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "courtAdminStoke",
    config.manageCasesBaseURLCase,
  );
});

setup("Setup NOC Solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInLongLivedUser(
    page,
    "nocSolicitor",
    config.manageCasesBaseURLCase,
  );
});
