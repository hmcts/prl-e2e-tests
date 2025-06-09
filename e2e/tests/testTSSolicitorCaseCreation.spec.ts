import { test } from "@playwright/test";
import { createTSSolicitorCase } from "../common/caseHelpers/solicitorCaseCreatorHelper.ts";
import config from "../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("TS Solicitor Case creation examples", (): void => {
  test("create C100 case", async ({ page }): Promise<void> => {
    await page.goto(config.manageCasesBaseURLCase);
    const caseRef = await createTSSolicitorCase(page, "C100");
    console.log(caseRef);
  });

  test("create FL401 case", async ({ page }): Promise<void> => {
    await page.goto(config.manageCasesBaseURLCase);
    const caseRef = await createTSSolicitorCase(page, "FL401");
    console.log(caseRef);
  });
});
