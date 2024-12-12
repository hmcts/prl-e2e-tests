import { Browser, Page } from "@playwright/test";
import {
  c100CaseWorkerActions,
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions
} from "../../../../common/types.ts";
import {
  createOrderManageOrders19Options
} from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import {
  howLongWillOrderBeInForce
} from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import {
  responsibleForServing
} from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";
import {
  ApplicationJourneysCheckGatekeeperJudgeCOOrder
} from "../manageOrders/application-journeys-check-gatekeeper-judgeCO-order.ts";
import { CompleteTheOrder } from "./completeTheOrder/completeTheOrder.ts";

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
  yesNoServiceOfApplication4: boolean;
  responsibleForServing: responsibleForServing;
}

export class CompleteOrderServiceOfApplication {
  public static async completeOrderServiceOfApplication({
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
    await CompleteTheOrder.completeTheOrder({
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
    });
  }
}
