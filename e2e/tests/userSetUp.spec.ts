import { test } from "@playwright/test";
import IdamLoginHelper from "../common/userHelpers/idamLoginHelper.ts";
import Config from "../config.ts";

test("Create court admin user", async ({ page }) => {
  const userInfo = await IdamLoginHelper.setupAndSignInUser(
    page,
    Config.manageCasesBaseURLCase,
    "caseWorker",
    true,
  );
  console.log(userInfo);
});

test("Create solicitor user", async ({ page }) => {
  const userInfo = await IdamLoginHelper.setupAndSignInUser(
    page,
    Config.manageCasesBaseURLCase,
    "solicitor",
    true,
  );
  console.log(userInfo);
});

test("Create case manager user", async ({ page }) => {
  const userInfo = await IdamLoginHelper.setupAndSignInUser(
    page,
    Config.manageCasesBaseURLCase,
    "caseManager",
    true,
  );
  console.log(userInfo);
});
