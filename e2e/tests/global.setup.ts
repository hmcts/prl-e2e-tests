import { test as setup } from "./fixtures.ts";
import dotenv from "dotenv";
import config from "../utils/config.utils.ts";

dotenv.config();

setup.describe("Setup users and retrieve tokens", () => {
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
    const s2sToken = await serviceAuthUtils.retrieveToken({
      microservice: "prl_cos_api",
    });
    process.env.S2S_TOKEN = s2sToken;
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

  setup("Setup Barrister user", async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "barrister",
      config.manageCasesBaseURLCase,
    );
  });
});
