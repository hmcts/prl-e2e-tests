import { APIRequestContext, request, test as setup } from "@playwright/test";
import dotenv from "dotenv";
import { getAccessToken } from "../common/getAccessTokenHelper";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config"; // Import config once
import Config from "../config"; // Import config once (use this one)

dotenv.config();

const env = process.env.TEST_ENV || "aat";

Config.setEnvironment();
Config.getEnvUserCredentials(env);
Config.courtNavEnvConfig(env);
Config.urlConfig(env);

setup("Setup solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "solicitor",
    config.manageCasesBaseURL,
    env,
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

setup("Retrieve bearer token for citizen user creation", async () => {
  const apiContext: APIRequestContext = await request.newContext();
  const token = await getAccessToken("citizenCreateUser", apiContext);
  if (!token) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  process.env.CITIZEN_CREATE_USER_BEARER_TOKEN = token;
});

setup("Setup judge user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "judge",
    config.manageCasesBaseURL,
    env,
  );
});

setup("Setup case manager user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "caseManager",
    config.manageCasesBaseURL,
    env,
  );
});

setup("Setup caseWorker user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "courtAdminSwansea",
    config.manageCasesBaseURL,
    env,
  );
});

setup("Setup Stoke court admin user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "courtAdminStoke",
    config.manageCasesBaseURL,
    env,
  );
});
