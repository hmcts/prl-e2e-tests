import { Page } from "@playwright/test";
import { CaseFilterPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/caseFilterPage";
import { TestingSupportDummyAdminCreateNoc2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc2Page";
import { solicitorCaseCreateType } from "../../../../common/types";
import { TestingSupportDummyAdminCreateNoc3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc3Page";
import { CreateAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/SubmitPage";
import { CaseListPage } from "../../../../pages/manageCases/caseList/caseListPage";
import { C100ManageOrders } from "./C100OrderCA/c100ManageOrders";

interface C100Params {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

export class C100CreateAnOrder {
  public static async c100CreateAnOrder({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
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
    if (solicitorCaseCreateType === "C100") {
      await C100ManageOrders.c100ManageOrders({
        page,
        accessibilityTest,
      });
    } else {
      // FL401 Manage Orders journey
    }
  }
}
