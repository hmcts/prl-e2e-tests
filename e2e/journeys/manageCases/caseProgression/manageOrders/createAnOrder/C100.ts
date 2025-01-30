import { Page } from "@playwright/test";
import { CaseFilterPage } from "../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/initialJourney/caseFilterPage.ts";
import { TestingSupportDummyAdminCreateNoc2Page } from "../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc2Page.ts";
import { solicitorCaseCreateType } from "../../../../../common/types.ts";
import { TestingSupportDummyAdminCreateNoc3Page } from "../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc3Page.ts";
import { CreateAnOrderSubmitPage } from "../../../../../pages/manageCases/caseProgression/manageOrders/createAnOrder/initialJourney/SubmitPage.ts";
import { CaseListPage } from "../../../../../pages/manageCases/caseList/caseListPage.ts";
import { C100ManageOrders } from "./C100OrderCA/c100ManageOrders.ts";

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
    }
  }
}
