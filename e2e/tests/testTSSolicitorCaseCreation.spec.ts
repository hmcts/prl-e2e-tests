import { test } from "@playwright/test";
import { createTSSolicitorCase } from "../common/caseHelpers/solicitorCaseCreatorHelper.ts";
import Config from "../config.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("TS Solicitor Case creation examples", (): void => {
  test("create C100 case", async ({ page }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef = await createTSSolicitorCase(page, "C100");
    console.log(caseRef);
  });

  test("create FL401 case", async ({ page }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef = await createTSSolicitorCase(page, "FL401");
    console.log(caseRef);
    console.log(caseRef);
  });
});
