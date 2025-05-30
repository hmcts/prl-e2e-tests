import { Page } from "@playwright/test";
import { CaseFilterPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/caseFilterPage";
import { TestingSupportDummyAdminCreateNoc2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc2Page";
import {
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  solicitorCaseCreateType,
} from "../../../../common/types";
import { TestingSupportDummyAdminCreateNoc3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc3Page";
import { CreateAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/SubmitPage";
import { CaseListPage } from "../../../../pages/manageCases/caseList/caseListPage";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders12Page";
import { Fl401ManageOrderDA } from "./FL401OrderDA/fl401ManageOrderDA";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders19Page";

interface FL401Params {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
  yesNoManageOrders: boolean;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  createOrderFL401Options: createOrderFL401Options;
  judgeTitles: judgeTitles;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  manageOrdersOptions: manageOrdersOptions;
}

export class FL401CreateAnOrder {
  public static async fL401CreateAnOrder({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
    howLongWillOrderBeInForce,
    yesNoManageOrders,
    judgeTitles,
    createOrderFL401Options,
    createOrderManageOrders19Options,
    manageOrdersOptions,
  }: FL401Params): Promise<void> {
    await CaseListPage.navigateToCreateCasePage(page);
    await CaseFilterPage.caseFilterPage({ page, accessibilityTest });
    await TestingSupportDummyAdminCreateNoc2Page.testingSupportDummyAdminCreateNoc2Page(
      { page, accessibilityTest, solicitorCaseCreateType },
    );
    await TestingSupportDummyAdminCreateNoc3Page.testingSupportDummyAdminCreateNoc3Page(
      { page, accessibilityTest, solicitorCaseCreateType },
    );
    await CreateAnOrderSubmitPage.createAnOrderSubmitPage({
      page,
      accessibilityTest,
    });
    await Fl401ManageOrderDA.fl401ManageOrderDA({
      page,
      accessibilityTest,
      solicitorCaseCreateType,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
      createOrderFL401Options,
      judgeTitles,
      createOrderManageOrders19Options,
      manageOrdersOptions,
    });
  }
}
