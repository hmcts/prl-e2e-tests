import { APIRequestContext, request, test as setup } from "@playwright/test";
import dotenv from "dotenv";
import { getAccessToken } from "../common/caseHelpers/getAccessTokenHelper.ts";
import IdamLoginHelper from "../common/userHelpers/idamLoginHelper.ts";
import config from "../utils/config.utils.ts";

dotenv.config();

setup.describe("Setup users and retrieve tokens", () => {
  setup.beforeAll("Retrieve idam token for user creation", async () => {
    const apiContext: APIRequestContext = await request.newContext();
    const token = await getAccessToken("citizenCreateUser", apiContext);
    if (!token) {
      throw new Error("Setup failed: Unable to get bearer token.");
    }
    process.env.CREATE_USER_BEARER_TOKEN = token;
  });

  setup("Setup solicitor user", async ({ page }) => {
    await IdamLoginHelper.signInLongLivedUser(
      page,
      "solicitor",
      config.manageCasesBaseURLCase,
    );
  });

  setup("Retrieve bearer token for courtNav DA case creation", async () => {
    const apiContextDaCreateCase: APIRequestContext =
      await request.newContext();
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

  setup("Setup NOC Solicitor user", async ({ page }) => {
    await IdamLoginHelper.signInLongLivedUser(
      page,
      "nocSolicitor",
      config.manageCasesBaseURLCase,
    );
  });
});
