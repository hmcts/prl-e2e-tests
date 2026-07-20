import { Browser, BrowserContext, Page } from "@playwright/test";
import { jsonDatas } from "./jsonDatas.ts";
import Config from "../../utils/config.utils.ts";
import { Helpers } from "../helpers.ts";
import { CaseEventUtils } from "../../utils/caseEvent.utils.js";

// Note: These methods assume the current page context is court admin
export async function completeCheckApplicationAndSendToGatekeeper(
  page: Page,
  caseRef: string,
): Promise<void> {
  const caseEventUtils = new CaseEventUtils();
  await caseEventUtils.submitEvent(
    page,
    caseRef,
    "fl401AddCaseNumber",
    jsonDatas.solicitorDACaseData,
  );
  await caseEventUtils.submitEvent(
    page,
    caseRef,
    "fl401SendToGateKeeper",
    jsonDatas.solicitorDACaseData,
  );
}

export async function completeCheckApplicationAndSendToGatekeeperAndCreateAnOrder(
  page: Page,
  browser: Browser,
  caseRef: string,
  manageOrderEventData: typeof jsonDatas,
): Promise<void> {
  await completeCheckApplicationAndSendToGatekeeper(page, caseRef);
  // open new browser context as judge to create the order
  const newBrowser = await browser.browserType().launch();
  const newContext: BrowserContext = await newBrowser.newContext({
    storageState: Config.sessionStoragePath + "judge.json",
  });
  const newPage: Page = await newContext.newPage();
  await Helpers.goToCase(
    newPage,
    Config.manageCasesBaseURLCase,
    caseRef,
    "tasks",
  );
  const caseEventUtils = new CaseEventUtils();
  await caseEventUtils.submitEvent(
    newPage,
    caseRef,
    "manageOrders",
    manageOrderEventData,
  );
}
