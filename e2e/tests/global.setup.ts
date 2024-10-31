import { APIRequestContext, request, test as setup } from "@playwright/test";
import IdamLoginHelper from "../common/idamLoginHelper";
import config from "../config";
import {
  getAccessToken,
  setupUser,
} from "../common/idamCreateCitizenUserApiHelper";
import { existsSync } from "fs";

setup("Setup solicitor user", async ({ page }) => {
  await IdamLoginHelper.signInSolicitorUser(
    page,
    "solicitor",
    config.manageCasesBaseURL,
  );
});

setup("Retrieve bearer token for citizen user creation", async () => {
  const apiContext: APIRequestContext = await request.newContext();
  const token = await getAccessToken(apiContext);
  if (!token) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  process.env.BEARER_TOKEN = token;
});

if (existsSync(".env")) {
  setup("Create dummy citizen user", async () => {
    await request.newContext();
    const token = process.env.BEARER_TOKEN;
    if (!token) {
      throw new Error(
        "Bearer token is not available. Ensure it is set in the environment.",
      );
    }
    try {
      await setupUser(token);
    } catch (error) {
      throw new Error(
        "Failed to create citizen user. Please ensure you are connected to the VPN.",
      );
    }
  });
}
