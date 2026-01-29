import { Browser, Page } from "@playwright/test";
import {
  applicationSubmittedBy,
  createOrderFL401Options,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { AdminEditAndApproveAnOrder1Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder1Page.ts";
import { AdminEditAndApproveAnOrder4Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder4Page.ts";
import { AdminEditAndApproveAnOrder21Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder21Page.ts";
import { AdminEditAndApproveAnOrder22Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder22Page.ts";
import { AdminEditAndApproveAnOrder23Page } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder23Page.ts";
import { AdminEditAndApproveAnOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrderSubmitPage.ts";
import { completeCheckApplicationAndSendToGatekeeperAndCreateAnOrder } from "../../../../common/caseHelpers/caseEventsHelper.ts";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders1Page.js";
import { ManageOrders2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders2Page.js";
import { ManageOrders5Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders5Page.js";
import { ManageOrders10Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders10Page.js";
import { ManageOrders19Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders19Page.js";
import { ManageOrders20Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders20Page.js";
import { ManageOrders24Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders24Page.js";
import { ManageOrders26PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders26PageCA.js";
import { ManageOrders27Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders27Page.js";
import { ManageOrders28Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders28Page.js";
import { c100CompleteOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/completeTheOrder/c100CompleteOrderSubmitPage.js";
import { C100OrdersTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100OrdersTabPage.js";

interface FL401CompleteTheOrderParams {
  page: Page;
  browser: Browser;
  accessibilityTest: boolean;
  ccdRef: string;
  createOrderFL401Options: createOrderFL401Options;
  personallyServed: boolean;
  manageOrderData: typeof jsonDatas;
  applicationSubmittedBy: applicationSubmittedBy;
}

interface C100CompleteTheOrderParams {
  page: Page;
  accessibilityTest: boolean;
  isUploadOrder: boolean;
  checkOption: string;
  serveOrderNow: boolean;
  personallyServed: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
  applicationSubmittedBy: applicationSubmittedBy;
}

// ServiceOfApplicationJourney seems to only work when it is put into this file, and not if it
// is put into E2eFlowUpToServiceOfApplication as its own class

export class CompleteTheOrder {
  public static async FL401completeTheOrder({
    page,
    browser,
    accessibilityTest,
    ccdRef,
    createOrderFL401Options,
    personallyServed,
    manageOrderData,
    applicationSubmittedBy,
  }: FL401CompleteTheOrderParams): Promise<void> {
    await completeCheckApplicationAndSendToGatekeeperAndCreateAnOrder(
      page,
      browser,
      ccdRef,
      manageOrderData,
    );
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
      applicationSubmittedBy,
    );
  }

  public static async C100completeTheOrder({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
    isUploadOrder,
    checkOption,
    serveOrderNow,
    personallyServed,
    applicationSubmittedBy,
  }: C100CompleteTheOrderParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, `Manage orders`);
    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
      isUploadOrder,
    });
    await ManageOrders2Page.manageOrders2Page({
      page,
      accessibilityTest,
    });
    await ManageOrders5Page.manageOrders5Page({
      page,
      accessibilityTest,
      isUploadOrder,
      solicitorCaseCreateType,
    });
    await ManageOrders10Page.manageOrders10Page({
      page,
      accessibilityTest,
    });
    await ManageOrders19Page.manageOrders19Page({
      page,
      accessibilityTest,
    });
    await ManageOrders20Page.manageOrders20Page({
      page,
      accessibilityTest,
    });
    await ManageOrders24Page.manageOrders24Page({
      page,
      accessibilityTest,
      checkOption,
    });
    await ManageOrders26PageCA.manageOrders26PageCA({
      page,
      accessibilityTest,
      serveOrderNow,
    });
    await ManageOrders27Page.manageOrders27Page(page, accessibilityTest);
    //validate content
    await ManageOrders28Page.manageOrders28Page(
      page,
      accessibilityTest,
      personallyServed,
      applicationSubmittedBy,
    );
    await c100CompleteOrderSubmitPage.c100CompleteOrdersubmitPage({
      page,
      accessibilityTest,
    });
    //Validating the Correct Order Name created in the 'Orders' tab
    await Helpers.clickTab(page, "Orders");
    await C100OrdersTabPage.c100OrdersTabPage(page, accessibilityTest);
  }
}
