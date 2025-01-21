import { Browser, Page } from "@playwright/test";
import {
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  WACaseWorkerActions,
} from "../../../../common/types.ts";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import { responsibleForServing } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";
import { CompleteTheOrder } from "../completeTheOrder/completeTheOrder.ts";
import { ServiceOfApplicationJourney } from "../serviceOfApplication/serviceOfApplication.ts";
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
    // TODO: new API call - need to check if/how the variables differ between tests unless it isn't needed see comment below
    // TODO: move into own UI test - unless it isn't needed see comment below
    await CompleteTheOrder.completeTheOrder({
      page: page,
      browser,
      accessibilityTest,
      ccdRef,
      createOrderFL401Options,
      personallyServed,
      manageOrderData,
    });
    await page.reload();
    // TODO: new API call - need to check if/how the variables differ between tests
    // TODO: move into own UI test
    await ServiceOfApplicationJourney.serviceOfApplicationJourney({
      page,
      accessibilityTest,
      createOrderFL401Options,
      yesNoServiceOfApplication4,
      responsibleForServing,
    });
  }
}
