import { Browser, BrowserContext, Page } from "@playwright/test";
import { jsonDatas } from "./jsonDatas.ts";
import Config from "../../utils/config.utils.ts";
import { Helpers } from "../helpers.ts";
import { CompleteTheOrder } from "../../journeys/manageCases/caseProgression/completeTheOrder/completeTheOrder.ts";
import { applicationSubmittedBy, createOrderFL401Options } from "../types.ts";
import { ConfidentialityCheck } from "../../journeys/manageCases/caseProgression/confidentilityCheck/confidentialityCheck.js";
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

export async function fl401CompleteEventsUpToServiceOfApplication(
  page: Page,
  browser: Browser,
  caseRef: string,
  manageOrderEventData: typeof jsonDatas,
  createOrderFL401Options: createOrderFL401Options,
  applicationSubmittedBy: applicationSubmittedBy,
): Promise<void> {
  await CompleteTheOrder.FL401completeTheOrder({
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
  if (applicationSubmittedBy === "Solicitor") {
    // this will have to be conditional
    await ConfidentialityCheck.confidentialityCheckLite(browser, caseRef);
  }
}

export async function c100CompleteEventsUpToServiceOfApplication(
  page: Page,
  caseRef: string,
  browser: Browser,
  manageOrderEventData: typeof jsonDatas,
  applicationSubmittedBy: applicationSubmittedBy,
): Promise<void> {
  await CompleteTheOrder.C100completeTheOrder({
    page: page,
    accessibilityTest: false,
    personallyServed: true,
    solicitorCaseCreateType: "C100",
    isUploadOrder: false,
    checkOption: "noCheck", //options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
    serveOrderNow: true, //select to serve order instantly
  });

  const caseEventUtils = new CaseEventUtils();
  await caseEventUtils.submitEvent(
    page,
    caseRef,
    "serviceOfApplication",
    manageOrderEventData,
  );
  if (applicationSubmittedBy === "Solicitor") {
    // this will have to be conditional
    await ConfidentialityCheck.confidentialityCheckLite(browser, caseRef);
  }
}

//need rework as failing with 403.
export async function completeC100Order(
  page: Page,
  browser: Browser,
  caseRef: string,
  manageOrderEventData: typeof jsonDatas,
): Promise<void> {
  // open new browser context as case worker to create the order
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
