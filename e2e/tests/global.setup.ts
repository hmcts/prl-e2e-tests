import { test as setup } from "./fixtures.ts";
import dotenv from "dotenv";
import config from "../utils/config.utils.ts";
import process from "node:process";

dotenv.config();

setup.describe("Setup users and retrieve tokens", () => {
  setup.beforeEach(async ({ page }) => {
    page.on("response", (response) => {
      if (response.status() === 502) {
        throw new Error(
          `Received 502 error from ${response.url()}. Aborting setup.`,
        );
      }
    });
  });

  setup.beforeAll(
    "Retrieve IDAM token for citizen user creation",
    async ({ tokenUtils }) => {
      const token = await tokenUtils.getAccessToken("citizenCreateUser");
      process.env.CREATE_USER_BEARER_TOKEN = token;
    },
  );

  setup("Setup solicitor user", async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "solicitor",
      config.manageCasesBaseURLCase,
    );
  });

  setup(
    "Retrieve bearer token for courtNav DA case creation",
    async ({ tokenUtils }) => {
      const token = await tokenUtils.getAccessToken("daCourtNavCreateCase");
      process.env.COURTNAV_CREATE_CASE_BEARER_TOKEN = token;
    },
  );

  setup("Retrieve s2s token", async ({ serviceAuthUtils }) => {
    try {
      const s2sToken = await serviceAuthUtils.retrieveToken({
        microservice: "prl_cos_api",
      });
      process.env.S2S_TOKEN = s2sToken;
    } catch (error) {
      if (error.message?.includes("502")) {
        throw new Error(
          "Received 502 error during S2S token retrieval. Aborting setup.",
        );
      }
      throw error;
    }
  });

  setup("Setup judge user", async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "judge",
      config.manageCasesBaseURLCase,
    );
  });

  setup("Setup case manager user", async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "caseManager",
      config.manageCasesBaseURLCase,
    );
  });

  setup("Setup caseWorker user", async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "caseWorker",
      config.manageCasesBaseURLCase,
    );
  });

  setup("Setup Stoke court admin user", async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "courtAdminStoke",
      config.manageCasesBaseURLCase,
    );
  });

  setup("Setup NOC Solicitor user", async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "nocSolicitor",
      config.manageCasesBaseURLCase,
    );
  });

  setup("Setup Legal Advisor user", async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "legalAdvisor",
      config.manageCasesBaseURLCase,
    );
  });

  setup("Setup Local Authority user", async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "localAuthority",
      config.manageCasesBaseURLCase,
    );
  });
});
