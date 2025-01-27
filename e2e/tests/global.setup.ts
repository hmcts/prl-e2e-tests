import { request, test as setup } from "@playwright/test";
import dotenv from "dotenv";
import { getAccessToken } from "../common/getAccessTokenHelper";
import IdamLoginHelper from "../common/userSetup/idamLoginHelper.ts";
import config from "../config";
import { setupUser } from "../common/userSetup/idamCreateUserApiHelper.ts";

dotenv.config();

setup("Set up users", async ({ page }) => {
  // retrieve bearer token for user creation
  const apiContext = await request.newContext();
  const userCreationToken = await getAccessToken("createUser", apiContext);

  if (!userCreationToken) {
    throw new Error(
      "Setup failed: Unable to retrieve bearer token for user creation.",
    );
  }

  process.env.CREATE_USER_IDAM_BEARER_TOKEN = userCreationToken;

  // define users and set up their accounts
  const users = ["judge", "caseWorker", "solicitor"];
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
