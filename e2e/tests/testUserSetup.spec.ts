import { setupUser } from "../common/userSetup/idamCreateUserApiHelper.ts";
import { test } from "@playwright/test";

test.describe("Create users tests", (): void => {
  test("create solicitor user", async ({ page }): Promise<void> => {
    const token: string = process.env.CITIZEN_CREATE_USER_BEARER_TOKEN!;
    await setupUser(token, "solicitor");
  });

  test("create judge user", async ({ page }): Promise<void> => {
    const token: string = process.env.CITIZEN_CREATE_USER_BEARER_TOKEN!;
    await setupUser(token, "judge");
  });
});
