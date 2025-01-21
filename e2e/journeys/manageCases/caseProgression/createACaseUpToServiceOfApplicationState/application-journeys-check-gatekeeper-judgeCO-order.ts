import { Browser, BrowserContext, Page } from "@playwright/test";
import {
  jsonDatas,
  submitEvent,
} from "../../../../common/solicitorCaseCreatorHelper.ts";
import Config from "../../../../config.ts";
import config from "../../../../config.ts";
import { Helpers } from "../../../../common/helpers.ts";

interface CheckApplicationParams {
  page: Page;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
}

export class ApplicationJourneysCheckGatekeeperJudgeCOOrder {
  public static async applicationJourneysCheckGatekeeperJudgeCOOrder({
    page,
    ccdRef,
    browser,
    manageOrderData,
  }: CheckApplicationParams): Promise<void> {
    await submitEvent(page, ccdRef, "fl401AddCaseNumber");
    await submitEvent(page, ccdRef, "fl401SendToGateKeeper");
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "judge.json",
    });
    const newPage: Page = await newContext.newPage();
    await Helpers.goToCase(newPage, config.manageCasesBaseURL, ccdRef, "tasks");
    if (manageOrderData === jsonDatas.manageOrderDataAmendDischargedVaried) {
      await submitEvent(
        newPage,
        ccdRef,
        "manageOrders",
        jsonDatas.manageOrderDataAmendDischargedVaried,
      );
    } else {
      await submitEvent(
        newPage,
        ccdRef,
        "manageOrders",
        jsonDatas.manageOrderDataPowerOfArrest,
      );
    }
  }
}
