import { Browser, BrowserContext, Page } from "@playwright/test";
import {
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  WACaseWorkerActions,
} from "../../../../common/types.ts";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import { responsibleForServing } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";
import { ApplicationJourneysCheckGatekeeperJudgeCOOrder } from "./application-journeys-check-gatekeeper-judgeCO-order.ts";
import { CompleteTheOrder } from "../completeTheOrder/completeTheOrder.ts";
import { ServiceOfApplicationJourney } from "../serviceOfApplication/serviceOfApplication.ts";
import Config from "../../../../config.ts";
import { jsonDatas } from "../../../../common/solicitorCaseCreatorHelper.ts";

interface CompleteTheOrderParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
  c100CaseWorkerActions: WACaseWorkerActions;
  manageOrdersOptions: manageOrdersOptions;
  createOrderFL401Options: createOrderFL401Options;
  yesNoManageOrders: boolean;
  judgeTitles: judgeTitles;
  withOrWithoutNotice: boolean;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  browser: Browser;
  personallyServed: boolean;
  yesNoServiceOfApplication4: boolean;
  responsibleForServing: responsibleForServing;
  manageOrderData: typeof jsonDatas;
}

// note: params are always the same from activateCase
export class E2eFlowUpToServiceOfApplication {
  public static async e2eFlowUpToServiceOfApplication({
    page,
    accessibilityTest,
    ccdRef,
    createOrderFL401Options,
    browser,
    personallyServed,
    yesNoServiceOfApplication4,
    responsibleForServing,
    manageOrderData,
  }: CompleteTheOrderParams): Promise<void> {
    await ApplicationJourneysCheckGatekeeperJudgeCOOrder.applicationJourneysCheckGatekeeperJudgeCOOrder(
      {
        page,
        ccdRef,
        browser,
        manageOrderData,
      },
    );
    // open new browser and sign in as court admin user
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "caseWorker.json",
    });
    const newPage: Page = await newContext.newPage();
    // TODO: new API call - need to check if/how the variables differ between tests unless it isn't needed see comment below
    // TODO: move into own UI test - unless it isn't needed see comment below
    await CompleteTheOrder.completeTheOrder({
      page: newPage,
      browser,
      accessibilityTest,
      ccdRef,
      createOrderFL401Options,
      personallyServed,
      manageOrderData,
    });
    // TODO: new API call - need to check if/how the variables differ between tests
    // TODO: move into own UI test
    await ServiceOfApplicationJourney.serviceOfApplicationJourney({
      page: newPage,
      accessibilityTest,
      createOrderFL401Options,
      yesNoServiceOfApplication4,
      responsibleForServing,
    });
  }
}
