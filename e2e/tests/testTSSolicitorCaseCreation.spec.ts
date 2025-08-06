import config from "../utils/config.utils.ts";
import { test } from "./fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("TS Solicitor Case creation examples", (): void => {
  test("create C100 case", async ({ page, caseEventUtils }): Promise<void> => {
    await page.goto(config.manageCasesBaseURLCase);
    const caseRef = await caseEventUtils.createTSSolicitorCase(page, "C100");
    console.log(caseRef);
  });

  test("create FL401 case", async ({ page, caseEventUtils }): Promise<void> => {
    await page.goto(config.manageCasesBaseURLCase);
    const caseRef = await caseEventUtils.createTSSolicitorCase(page, "FL401");
    console.log(caseRef);
  });
});
