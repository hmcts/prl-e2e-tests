import Config from "../utils/config.utils.ts";
import { test } from "./fixtures.js";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("CA Case creation examples", (): void => {
  test("create case and submit and pay", async ({ browser, caseEventUtils }): Promise<void> => {
    await caseEventUtils.createCACase(browser);
  });
});
