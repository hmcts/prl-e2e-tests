import {
  APIRequestContext,
  Page,
  request,
  test as setup,
} from "@playwright/test";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config";
import { getAccessToken } from "../common/getAccessTokenHelper";
import { existsSync } from "fs";

async function setupSolicitorUser(page: Page) {
  await IdamLoginHelper.signInSolicitorUser(
    page,
    "solicitor",
    config.manageCasesBaseURL,
  );
}

async function setupCitizenUserToken() {
  const apiContext: APIRequestContext = await request.newContext();
  const token = await getAccessToken("citizenCreateUser", apiContext);
  if (!token) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  process.env.CITIZEN_CREATE_USER_BEARER_TOKEN = token;
}

const isEnvFilePresent = existsSync(".env");
const runningTest = process.env.RUNNING_TEST;

if (!isEnvFilePresent) {
  if (runningTest === "manageCases") {
    setup("Setup solicitor user", async ({ page }) => {
      await setupSolicitorUser(page);
    });
  } else if (runningTest === "citizenFrontend") {
    setup("Retrieve bearer token for citizen user creation", async () => {
      await setupCitizenUserToken();
    });
  }
} else {
  setup("Setup solicitor user", async ({ page }) => {
    await setupSolicitorUser(page);
  });
  setup("Retrieve bearer token for citizen user creation", async () => {
    await setupCitizenUserToken();
  });
}
