import { test } from "./fixtures.ts";
import { CreateUserUtil } from "../utils/createUser.utils.ts";
import config from "../utils/config.utils.ts";
import process from "node:process";

test.describe("Citizen C100 Case Creation Utils", () => {
  test("Create and serve Citizen C100 application", async ({
    courtAdminStoke,
    citizenC100CaseUtils,
    navigationUtils,
  }) => {
    const token = process.env.CREATE_USER_BEARER_TOKEN as string;
    const citizenUserInfo = await CreateUserUtil.createUser(token, "citizen");
    const caseId =
      await citizenC100CaseUtils.createAndSubmitCitizenCase(citizenUserInfo);
    await navigationUtils.goToCase(
      courtAdminStoke.page,
      config.manageCasesBaseURLCase,
      caseId,
    );
  });
});
