import { test } from "@playwright/test";
import IdamLoginHelper from "../common/userHelpers/idamLoginHelper.ts";
import Config from "../utils/config.utils.ts";

test("Create citizen user", async ({ page }) => {
  const userInfo = await IdamLoginHelper.setupAndSignInUser(
    page,
    Config.citizenFrontendBaseURL,
    "citizen_idam",
    true,
  );
  console.log(userInfo);
});

test("Create court admin user", async ({ page }) => {
  const userInfo = await IdamLoginHelper.setupAndSignInUser(
    page,
    Config.manageCasesBaseURLCase,
    "caseWorker_idam",
    true,
  );
  console.log(userInfo);
});

test("Create solicitor user", async ({ page }) => {
  const userInfo = await IdamLoginHelper.setupAndSignInUser(
    page,
    Config.manageCasesBaseURLCase,
    "solicitor_idam",
    true,
  );
  console.log(userInfo);
});

test("Create case manager user", async ({ page }) => {
  const userInfo = await IdamLoginHelper.setupAndSignInUser(
    page,
    Config.manageCasesBaseURLCase,
    "caseManager_idam",
    true,
  );
  console.log(userInfo);
});

// commented out until we change azure secrets to judge user: Yolanda Cooper
// test("Create judge user", async ({ page }) => {
//   const userInfo = await IdamLoginHelper.setupAndSignInUser(
//       page,
//       Config.manageCasesBaseURLCase,
//       "judge",
//       true,
//   );
//   console.log(userInfo);
// });
