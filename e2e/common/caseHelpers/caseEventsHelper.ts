import { Browser, BrowserContext, Page } from "@playwright/test";
import { jsonDatas } from "./jsonDatas.ts";
import Config from "../../utils/config.utils.ts";
import { Helpers } from "../helpers.ts";
import { CompleteTheOrder } from "../../journeys/manageCases/caseProgression/completeTheOrder/completeTheOrder.ts";
import { applicationSubmittedBy, createOrderFL401Options } from "../types.ts";
import { ConfidentialityCheck } from "../../journeys/manageCases/caseProgression/confidentilityCheck/confidentialityCheck.js";
import { CaseEventUtils } from "../../utils/caseEvent.utils.js";
import { ServiceOfApplication } from "../../journeys/manageCases/caseProgression/serviceOfApplication/serviceOfApplication.js";

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
  // open new browser context as judge to creat the order
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

export async function completeEventsUpToServiceOfApplication(
  page: Page,
  browser: Browser,
  caseRef: string,
  manageOrderEventData: typeof jsonDatas,
  createOrderFL401Options: createOrderFL401Options,
  applicationSubmittedBy: applicationSubmittedBy,
): Promise<void> {
  await CompleteTheOrder.completeTheOrder({
    page: page,
    browser: browser,
    accessibilityTest: false,
    ccdRef: caseRef,
    createOrderFL401Options: createOrderFL401Options,
    personallyServed: true,
    manageOrderData: manageOrderEventData,
    applicationSubmittedBy: applicationSubmittedBy,
  });
  // wait for response from previous event call before submitting next event
  await page.waitForResponse(
    `${Config.manageCasesBaseURL}/data/cases/${caseRef}/events`,
  );
  const caseEventUtils = new CaseEventUtils();
  await caseEventUtils.submitEvent(
    page,
    caseRef,
    "serviceOfApplication",
    manageOrderEventData,
  );
  if(applicationSubmittedBy === "Solicitor") {
    // this will have to be conditional
    await ConfidentialityCheck.confidentialityCheckLite(browser, caseRef);
  }
}
