import { Browser, BrowserContext, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { AdminEditAndApproveAnOrder1Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder1Page";
import { AdminEditAndApproveAnOrder4Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder4Page";
import { AdminEditAndApproveAnOrder21Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder21Page";
import { AdminEditAndApproveAnOrder22Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder22Page";
import { AdminEditAndApproveAnOrder23Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder23Page";
import { AdminEditAndApproveAnOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrderSubmitPage";
import Config from "../../../../config";
import config from "../../../../config";
import { ApplicationJourneysCheckGatekeeperJudgeCOOrder } from "../manageOrders/application-journeys-check-gatekeeper-judgeCO-order";
import {
  c100CaseWorkerActions,
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
} from "../../../../common/types";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page";

interface CompleteTheOrderParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
  c100CaseWorkerActions: c100CaseWorkerActions;
  manageOrdersOptions: manageOrdersOptions;
  createOrderFL401Options: createOrderFL401Options;
  yesNoManageOrders: boolean;
  judgeTitles: judgeTitles;
  withOrWithoutNotice: boolean;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  browser: Browser;
  personallyServed: boolean;
}

export class CompleteTheOrder {
  public static async completeTheOrder({
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
    page = await newContext.newPage();
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    // complete the task Complete the Order
    switch (createOrderFL401Options) {
      case "power of arrest":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Complete the Order - Power of arrest (FL406)",
          "Complete the Order",
        );
        break;
      case "amend discharge varied order":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Complete the Order - Amended, discharged or varied order (FL404B)",
          "Complete the Order",
        );
        break;
    }
    await AdminEditAndApproveAnOrder1Page.adminEditAndApproveAnOrder1Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrder4Page.adminEditAndApproveAnOrder4Page(
      page,
      accessibilityTest,
      createOrderFL401Options,
    );
    await AdminEditAndApproveAnOrder21Page.adminEditAndApproveAnOrder21Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrder22Page.adminEditAndApproveAnOrder22Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrder23Page.adminEditAndApproveAnOrder23Page(
      page,
      accessibilityTest,
      personallyServed,
    );
    await AdminEditAndApproveAnOrderSubmitPage.adminEditAndApproveAnOrderSubmitPage(
      page,
      accessibilityTest,
      createOrderFL401Options,
    );
  }
}
