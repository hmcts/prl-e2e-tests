import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { AdminEditAndApproveAnOrder1Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder1Page.ts";
import { AdminEditAndApproveAnOrder4Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder4Page.ts";
import { AdminEditAndApproveAnOrder21Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder21Page.ts";
import { AdminEditAndApproveAnOrder22Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder22Page.ts";
import { AdminEditAndApproveAnOrder23Page } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder23Page.ts";
import { AdminEditAndApproveAnOrderSubmitPage } from "../../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrderSubmitPage.ts";
import config from "../../../../../config.ts";
import {
  applicationSubmittedBy,
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  WACaseWorkerActions,
} from "../../../../../common/types.ts";
import { createOrderManageOrders19Options } from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import { responsibleForServing } from "../../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";

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

// ServiceOfApplicationJourney seems to only work when it is put into this file, and not if it
// is put into E2eFlowUpToServiceOfApplication as its own class

export class CompleteTheOrder {
  public static async completeTheOrder({
    page,
    accessibilityTest,
    ccdRef,
    createOrderFL401Options,
    personallyServed,
    applicationSubmittedBy,
  }: CompleteTheOrderParams): Promise<void> {
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
      createOrderFL401Options,
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
      applicationSubmittedBy,
    );
    await AdminEditAndApproveAnOrderSubmitPage.adminEditAndApproveAnOrderSubmitPage(
      page,
      accessibilityTest,
      createOrderFL401Options,
      personallyServed,
    );
  }
}
