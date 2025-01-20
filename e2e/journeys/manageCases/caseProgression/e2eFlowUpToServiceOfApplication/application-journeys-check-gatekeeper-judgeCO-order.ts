import { Browser, BrowserContext, Page } from "@playwright/test";
import {
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  WACaseWorkerActions,
} from "../../../../common/types.ts";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import {
  jsonDatas,
  submitEvent,
} from "../../../../common/solicitorCaseCreatorHelper.ts";
import Config from "../../../../config.ts";
import config from "../../../../config.ts";
import { Helpers } from "../../../../common/helpers.ts";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  c100CaseWorkerActions: WACaseWorkerActions;
  createOrderFL401Options: createOrderFL401Options;
  yesNoManageOrders: boolean;
  judgeTitles: judgeTitles;
  withOrWithoutNotice: boolean;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  manageOrdersOptions: manageOrdersOptions;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
}

export class ApplicationJourneysCheckGatekeeperJudgeCOOrder {
  public static async applicationJourneysCheckGatekeeperJudgeCOOrder({
    page,
    accessibilityTest,
    ccdRef,
    c100CaseWorkerActions,
    createOrderFL401Options,
    yesNoManageOrders,
    judgeTitles,
    withOrWithoutNotice,
    createOrderManageOrders19Options,
    howLongWillOrderBeInForce,
    manageOrdersOptions,
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
