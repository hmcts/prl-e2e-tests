import { test } from "./fixtures.ts";
import Config from "../utils/config.utils.ts";
import { SolicitorCACaseCreator } from "../common/caseHelpers/solicitorCACaseCreator.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("CA Case creation examples", (): void => {
  test("create case and submit and pay", async ({ page }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    console.log(caseRef);
  });
});
