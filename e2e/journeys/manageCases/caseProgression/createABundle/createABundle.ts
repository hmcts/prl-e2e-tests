import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { CreateBundleSubmitPage } from "../../../../pages/manageCases/caseProgression/createBundle/createBundleSubmitPage.ts";
import { CreateBundle1Page } from "../../../../pages/manageCases/caseProgression/createBundle/createBundle1Page.ts";
import {
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  WACaseWorkerActions,
} from "../../../../common/types.ts";
import { E2eFlowUpToServiceOfApplication } from "../createACaseUpToServiceOfApplicationState/e2eFlowUpToServiceOfApplication.ts";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import { responsibleForServing } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";
import { jsonDatas } from "../../../../common/solicitorCaseCreatorHelper.ts";

interface ServiceOfApplicationJourneyParams {
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

export class CreateABundleJourney {
  public static async createABundleJourney({
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
    manageOrderData,
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    await E2eFlowUpToServiceOfApplication.e2eFlowUpToServiceOfApplication({
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
      manageOrderData,
      isManualSOA: false,
    });
    await page.reload();
    await Helpers.chooseEventFromDropdown(page, "Create a bundle");
    await CreateBundle1Page.createBundle1Page({
      page,
      accessibilityTest,
    });
    await CreateBundleSubmitPage.createBundleSubmitPage({
      page,
      accessibilityTest,
    });
  }
}
