import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { StatementOfService1Page } from "../../../../pages/manageCases/caseProgression/statementOfService/statementOfService1Page.ts";
import { StatementOfServiceSubmitPage } from "../../../../pages/manageCases/caseProgression/statementOfService/StatementOfServiceSubmitPage.ts";
import {
  applicationSubmittedBy,
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  WACaseWorkerActions,
} from "../../../../common/types.ts";
import { E2eFlowUpToServiceOfApplication } from "../e2eFlowUpToServiceOfApplication/e2eFlowUpToServiceOfApplication.ts";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import { responsibleForServing } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";

interface statementOfServiceParams {
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

export class StatementOfService {
  public static async statementOfService({
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
  }: statementOfServiceParams): Promise<void> {
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
      applicationSubmittedBy,
    });
    const eventToSelect: WACaseWorkerActions = "Statement of service";
    await Helpers.chooseEventFromDropdown(page, eventToSelect);
    await StatementOfService1Page.statementOfService1Page({
      page,
      accessibilityTest,
    });
    await StatementOfServiceSubmitPage.statementOfServiceSubmitPage({
      page,
      accessibilityTest,
    });
  }
}
