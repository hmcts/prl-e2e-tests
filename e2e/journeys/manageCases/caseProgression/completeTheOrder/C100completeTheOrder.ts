import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders1Page.js";
import { ManageOrders2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders2Page.js";
import { ManageOrders5Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders5Page.js";
import { ManageOrders10Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders10Page.js";
import { ManageOrders19Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders19Page.js";
import { ManageOrders20Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders20Page.js";
import { ManageOrders24Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders24Page.js";
import { solicitorCaseCreateType } from "../../../../common/types.js";
import { ManageOrders26PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders26PageCA.js";
import { ManageOrders27Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders27Page.js";
import { ManageOrders28Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders28Page.js";
import { C100OrdersTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100OrdersTabPage.js";
import { c100CompleteOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/completeTheOrder/c100CompleteOrderSubmitPage.js";

interface C100CompleteTheOrderParams {
  page: Page;
  accessibilityTest: boolean;
  isUploadOrder: boolean;
  checkOption: string;
  serveOrderNow: boolean;
  personallyServed: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

export class C100CompleteTheOrder {
  public static async C100completeTheOrder({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
    isUploadOrder,
    checkOption,
    serveOrderNow,
    personallyServed,
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
