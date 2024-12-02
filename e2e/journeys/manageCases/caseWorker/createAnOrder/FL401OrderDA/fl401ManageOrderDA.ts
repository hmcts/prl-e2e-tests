import { Page } from "@playwright/test";
import {
  createOrderFL401Options,
  judgeTitles,
  solicitorCaseCreateType,
} from "../../../../../common/types";
import {
  howLongWillOrderBeInForce,
  ManageOrders12Page,
} from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page";
import { CaseDetailsSummaryPage } from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/caseDetailsSummaryPage";
import { ManageOrders1Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Page";
import { ManageOrders2Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders2Page";
import { ManageOrders5Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders5Page";
import {
  createOrderManageOrders19Options,
  ManageOrders19Page,
} from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page";
import { ManageOrders20Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders20Page";
import { ManageOrders24Page } from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders24Page";
import { ManageOrdersSubmitPage } from "../../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrdersSubmitPage";

interface FL401Params {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
  yesNoManageOrders: boolean;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  createOrderFL401Options: createOrderFL401Options;
  judgeTitles: judgeTitles;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
}

export class Fl401ManageOrderDA {
  public static async fl401ManageOrderDA({
    page,
    accessibilityTest,
    yesNoManageOrders,
    howLongWillOrderBeInForce,
    createOrderFL401Options,
    judgeTitles,
    createOrderManageOrders19Options,
  }: FL401Params): Promise<void> {
    await CaseDetailsSummaryPage.caseDetailsSummaryPage({
      page,
      accessibilityTest,
    });
    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
    });
    await ManageOrders2Page.manageOrders2Page({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    await ManageOrders5Page.manageOrders5Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
      createOrderFL401Options,
      judgeTitles,
    });
    await ManageOrders12Page.manageOrders12Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
    });
    await ManageOrders19Page.manageOrders19Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
      createOrderManageOrders19Options,
      createOrderFL401Options,
    });
    await ManageOrders20Page.manageOrders20Page({
      page,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
      accessibilityTest,
      createOrderFL401Options,
    });
    await ManageOrders24Page.manageOrders24Page({
      page,
      accessibilityTest,
    });
    await ManageOrdersSubmitPage.manageOrdersSubmitPage({
      page,
      accessibilityTest,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
    });
  }
}
