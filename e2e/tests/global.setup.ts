import {APIRequestContext, Page, request, test as setup, Browser} from "@playwright/test";
import dotenv from "dotenv";
import { getAccessToken } from "../common/getAccessTokenHelper";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config";

dotenv.config();

setup("Define test environment", async ({ page, browser }: { page: Page; browser: Browser }) => {
  await page.goto(config.citizenFrontendBaseURL);
  const citizenUrl = await page.evaluate(() => location.href);

  const context = await browser.newContext();
  const newPage = await context.newPage();
  await newPage.goto(config.manageCasesBaseURL);
  const manageCaseUrl = await newPage.evaluate(() => location.href);

  const getEnvironment = (url: string) =>
      ["aat", "demo", "preview"].find((env) => url.includes(env)) || "unknown";

  process.env.CITIZEN_TEST_ENV = getEnvironment(citizenUrl);
  process.env.MANAGE_CASES_TEST_ENV = getEnvironment(manageCaseUrl);
});


setup("Setup solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInUser(
    page,
    "solicitor",
    config.manageCasesBaseURL,
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
