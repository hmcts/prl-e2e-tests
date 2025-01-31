import { Browser, BrowserContext, Page } from "@playwright/test";
import { jsonDatas, submitEvent } from "./solicitorCaseCreatorHelper.ts";
import Config from "../config.ts";
import config from "../config.ts";
import { Helpers } from "./helpers.ts";
import { CompleteTheOrder } from "../journeys/manageCases/caseProgression/manageOrders/completeTheOrder/completeTheOrder.ts";
import { applicationSubmittedBy, createOrderFL401Options } from "./types.ts";

// Note: These methods assume the current page context is court admin

export async function completeCheckApplicationAndSendToGatekeeper(
  page: Page,
  caseRef: string,
): Promise<void> {
  await submitEvent(page, caseRef, "fl401AddCaseNumber");
  await submitEvent(page, caseRef, "fl401SendToGateKeeper");
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
  await Helpers.goToCase(newPage, config.manageCasesBaseURL, caseRef, "tasks");
  await submitEvent(newPage, caseRef, "manageOrders", manageOrderEventData);
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
    `https://manage-case.aat.platform.hmcts.net/data/cases/${caseRef}/events`,
  );
  await submitEvent(
    page,
    caseRef,
    "serviceOfApplication",
    manageOrderEventData,
  );
}
