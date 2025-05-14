import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { ManageOrders1Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders1Page";
import { ManageOrders2Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders2Page";
import { ManageOrders5Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders5Page";
import { ManageOrders10Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders10Page";
import { ManageOrders19Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders19Page";
import { ManageOrders20Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders20Page";
import { ManageOrders24Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders24Page";
import { SubmitPage } from "../../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/submitPage";
import { solicitorCaseCreateType } from "../../../../../common/types.ts";

interface C100ManageOrdersOptions {
  page: Page;
  accessibilityTest: boolean;
  isUploadOrder: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

export class C100ManageOrders {
  public static async c100ManageOrders({
    page: page,
    accessibilityTest: accessibilityTest,
    solicitorCaseCreateType,
    isUploadOrder,
  }: C100ManageOrdersOptions): Promise<void> {
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
    });
    await SubmitPage.submitPage({
      page,
      accessibilityTest,
    });
  }
}
