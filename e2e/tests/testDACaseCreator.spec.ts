import { test } from "./fixtures";
import { Page } from "playwright-core";
import Config from "../utils/config.utils";
import { Helpers } from "../common/helpers";
import { completeCheckApplicationAndSendToGatekeeper } from "../common/caseHelpers/caseEventsHelper";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Case creation examples", (): void => {
  test("create case", async ({ browser, caseEventUtils }): Promise<void> => {
    await caseEventUtils.createDACase(browser);
  });

  test("create solicitor case - gatekeeping", async ({
    browser,
    caseEventUtils,
  }): Promise<void> => {
    await caseEventUtils.createDACaseSendToGatekeeper(browser);
  });

  test("create courtnav case and send to gatekeeper example", async ({
    browser,
    courtNavUtils,
  }): Promise<void> => {
    const caseRef = await courtNavUtils.createCase(false, false);
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
    await completeCheckApplicationAndSendToGatekeeper(caPage, caseRef);
  });

  test("create courtnav", async ({ browser, courtNavUtils }): Promise<void> => {
    await courtNavUtils.createCase(false, false);
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
  });
});
