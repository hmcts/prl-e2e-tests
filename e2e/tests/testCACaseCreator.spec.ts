import Config from "../utils/config.utils.ts";
import { test } from "./fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("CA Case creation examples", (): void => {
  test("create case and submit and pay", async ({
    manageCasesEventUtils,
  }): Promise<void> => {
    await manageCasesEventUtils.submitTSSolicitorCase("C100");
  });
});
