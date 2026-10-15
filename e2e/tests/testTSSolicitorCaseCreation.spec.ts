import config from "../utils/config.utils.ts";
import { test } from "./fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("TS Solicitor Case creation examples", (): void => {
  test("create C100 case", async ({ manageCasesEventUtils }): Promise<void> => {
    const caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    console.log(caseRef);
  });

  test("create FL401 case", async ({
    manageCasesEventUtils,
  }): Promise<void> => {
    const caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    console.log(caseRef);
  });
});
