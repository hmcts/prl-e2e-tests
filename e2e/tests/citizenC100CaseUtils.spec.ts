import { test } from "./fixtures.ts";
import { CreateUserUtil } from "../utils/createUser.utils.ts";
import config from "../utils/config.utils.ts";
import process from "node:process";

test.describe("Citizen C100 Case Creation Utils", () => {
  test("Create and serve Citizen C100 application", async ({
    caseWorker,
    citizenC100CaseUtils,
    navigationUtils,
  }) => {
    const token = process.env.CREATE_USER_BEARER_TOKEN as string;
    const citizenUserInfo = await CreateUserUtil.createUser(token, "citizen");
    const caseId =
      await citizenC100CaseUtils.setupCitizenC100Application(citizenUserInfo);
    await navigationUtils.goToCase(
      caseWorker.page,
      config.manageCasesBaseURLCase,
      caseId,
    );
  });
});
