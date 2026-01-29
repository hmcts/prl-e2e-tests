import { test } from "@playwright/test";
import { CitizenCACaseUtils } from "../utils/citizenCACase.utils.js";
import { CreateUserUtil } from "../utils/createUser.utils.js";
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";

test.describe("Citizen CA Case creation examples", () => {
  test("Create and submit a citizen CA case", async ({}) => {
    const userInfo = await CreateUserUtil.createUser(
      process.env.CREATE_USER_BEARER_TOKEN as string,
      "citizen",
    );
    const caCaseCreator = new CitizenCACaseUtils(
      new ServiceAuthUtils(),
      new IdamUtils(),
    );
    await caCaseCreator.createAndSubmitCase(userInfo);
  });
});
