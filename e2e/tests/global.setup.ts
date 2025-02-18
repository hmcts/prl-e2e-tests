import { APIRequestContext, request, test as setup } from "@playwright/test";
import dotenv from "dotenv";
import { getAccessToken } from "../common/getAccessTokenHelper";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config";

dotenv.config();

setup("Setup solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
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

setup("Retrieve bearer token for citizen user creation", async () => {
  const apiContext: APIRequestContext = await request.newContext();
  const token = await getAccessToken("citizenCreateUser", apiContext);
  if (!token) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  process.env.CITIZEN_CREATE_USER_BEARER_TOKEN = token;
});

setup("Setup judge user", async ({ page }) => {
  await IdamLoginHelper.signInUser(page, "judge", config.manageCasesBaseURLCase);
});

setup("Setup case manager user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "caseManager",
    config.manageCasesBaseURLCase,
  );
});

setup("Setup caseWorker user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "caseWorker",
    config.manageCasesBaseURLCase,
  );
});

setup("Setup Stoke court admin user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "courtAdminStoke",
    config.manageCasesBaseURLCase,
  );
});
