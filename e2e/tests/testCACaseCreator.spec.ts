import { test } from "./fixtures.ts";
import Config from "../utils/config.utils.ts";
import { SolicitorCACaseCreator } from "../common/caseHelpers/solicitorCACaseCreator.ts";
import {
  jsonDatas,
  submitEvent,
} from "../common/caseHelpers/solicitorCaseCreatorHelper.js";
import { Helpers } from "../common/helpers.js";
import config from "../utils/config.utils.js";
import { SolicitorDACaseCreator } from "../common/caseHelpers/solicitorDACaseCreator.js";
import { Page } from "@playwright/test";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("CA Case creation examples", (): void => {
  test("create case and submit and pay", async ({ page }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    console.log(caseRef);
  });

  test("create C100 solicitor case - gatekeeping", async ({
    browser,
    page,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    console.log(caseRef);

    await SolicitorCACaseCreator.c100IssueAndSendToLocalCourt(browser, caseRef);

    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      caPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );

    await submitEvent(
      caPage,
      caseRef,
      "sendToGateKeeper",
      jsonDatas.solicitorCACaseData,
    );
  });
  test("create DA solicitor case - gatekeeping", async ({
    browser,
    page,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef: string =
      await SolicitorDACaseCreator.createCaseStatementOfTruthAndSubmit(page);
    console.log(caseRef);
    // open new browser and sign in as court admin user
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
    await submitEvent(caPage, caseRef, "fl401SendToGateKeeper");
  });
});
