import { Browser, BrowserContext, Page } from "@playwright/test";
import {
  applicationSubmittedBy,
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  WACaseWorkerActions,
} from "../../../../common/types.ts";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import { responsibleForServing } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";
import { ApplicationJourneysCheckGatekeeperJudgeCOOrder } from "./application-journeys-check-gatekeeper-judgeCO-order.ts";
import { CompleteTheOrder } from "./completeTheOrder/completeTheOrder.ts";
import { ServiceOfApplicationJourney } from "./serviceOfApplication/serviceOfApplication.ts";
import Config from "../../../../config.ts";

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
  applicationSubmittedBy: applicationSubmittedBy;
}

export class E2eFlowUpToServiceOfApplication {
  public static async e2eFlowUpToServiceOfApplication({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
    ccdRef,
    c100CaseWorkerActions,
    manageOrdersOptions,
    createOrderFL401Options,
    yesNoManageOrders,
    judgeTitles,
    withOrWithoutNotice,
    createOrderManageOrders19Options,
    howLongWillOrderBeInForce,
    browser,
    personallyServed,
    yesNoServiceOfApplication4,
    responsibleForServing,
    applicationSubmittedBy,
  }: CompleteTheOrderParams): Promise<void> {
    await ApplicationJourneysCheckGatekeeperJudgeCOOrder.applicationJourneysCheckGatekeeperJudgeCOOrder(
      {
        page,
        accessibilityTest,
        yesNoSendToGateKeeper,
        ccdRef,
        c100CaseWorkerActions,
        manageOrdersOptions,
        createOrderFL401Options,
        yesNoManageOrders,
        judgeTitles,
        withOrWithoutNotice,
        createOrderManageOrders19Options,
        howLongWillOrderBeInForce,
        browser,
      },
    );
    // open new browser and sign in as court admin user
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "caseWorker.json",
    });
    const newPage: Page = await newContext.newPage();
    await CompleteTheOrder.completeTheOrder({
      page: newPage,
      accessibilityTest,
      yesNoSendToGateKeeper,
      ccdRef,
      c100CaseWorkerActions,
      manageOrdersOptions,
      createOrderFL401Options,
      yesNoManageOrders,
      judgeTitles,
      withOrWithoutNotice,
      createOrderManageOrders19Options,
      howLongWillOrderBeInForce,
      browser,
      personallyServed,
      yesNoServiceOfApplication4,
      responsibleForServing,
      applicationSubmittedBy,
    });
    await ServiceOfApplicationJourney.serviceOfApplicationJourney({
      page: newPage,
      accessibilityTest,
      createOrderFL401Options,
      yesNoServiceOfApplication4,
      responsibleForServing,
      applicationSubmittedBy,
    });
  }
}
