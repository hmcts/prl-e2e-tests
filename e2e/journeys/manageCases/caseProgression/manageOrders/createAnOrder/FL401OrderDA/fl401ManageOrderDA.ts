import { Page } from "@playwright/test";
import {
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  solicitorCaseCreateType,
} from "../../../../../../common/types.ts";
import {
  howLongWillOrderBeInForce,
  ManageOrders12Page,
} from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderDA/manageOrders12Page.ts";
import { CaseDetailsSummaryPage } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderDA/caseDetailsSummaryPage.ts";
import { ManageOrders1Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderDA/manageOrders1Page.ts";
import { ManageOrders2Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderDA/manageOrders2Page.ts";
import { CreateOrderManageOrders5Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderDA/createOrderManageOrders5Page.ts";
import {
  createOrderManageOrders19Options,
  ManageOrders19Page,
} from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderDA/manageOrders19Page.ts";
import { ManageOrders20Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderDA/manageOrders20Page.ts";
import { ManageOrders24Page } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderDA/manageOrders24Page.ts";
import { ManageOrdersSubmitPage } from "../../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/orderDA/manageOrdersSubmitPage.ts";

interface FL401Params {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
  yesNoManageOrders: boolean;
  manageOrdersOptions: manageOrdersOptions;
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
    manageOrdersOptions,
  }: FL401Params): Promise<void> {
    await CaseDetailsSummaryPage.caseDetailsSummaryPage({
      page,
      accessibilityTest,
    });
    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
      manageOrdersOptions,
    });
    await ManageOrders2Page.manageOrders2Page({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    await CreateOrderManageOrders5Page.manageOrders5Page({
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
