import { Page } from "@playwright/test";
import { CaseFilterPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/caseFilterPage";
import { TestingSupportDummyAdminCreateNoc2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc2Page";
import { solicitorCaseCreateType } from "../../../../common/types";
import { TestingSupportDummyAdminCreateNoc3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc3Page";
import { CreateAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/SubmitPage";
import { CaseListPage } from "../../../../pages/manageCases/caseList/caseListPage";
import { CaseDetailsSummaryPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/caseDetailsSummaryPage";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Page";
import { ManageOrders2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders2Page";
import { ManageOrders5Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders5Page";
import {
  howLongWillOrderBeInForce,
  ManageOrders12Page,
} from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page";
import { ManageOrders19Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page";
import { ManageOrders20Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders20Page";
import { ManageOrders24Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders24Page";
import { ManageOrdersSubmitPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrdersSubmitPage";

interface C100Params {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
  yesNoManageOrders: boolean;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
}

export class FL401CreateAnOrder {
  public static async fL401CreateAnOrder({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
    howLongWillOrderBeInForce,
    yesNoManageOrders,
  }: C100Params): Promise<void> {
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
    });
    await ManageOrders5Page.manageOrders5Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
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
    });
    await ManageOrders20Page.manageOrders20Page({
      page,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
      accessibilityTest,
    });
    await ManageOrders24Page.manageOrders24Page({
      page,
      accessibilityTest,
    });
    await ManageOrdersSubmitPage.manageOrdersSubmitPage({
      page,
      accessibilityTest,
      yesNoManageOrders,
      howLongWillOrderBeInForce
    });
  }
}
