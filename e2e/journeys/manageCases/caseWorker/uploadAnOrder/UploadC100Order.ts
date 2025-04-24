import { Page } from "@playwright/test";
import { CaseFilterPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/caseFilterPage";
import { TestingSupportDummyAdminCreateNoc2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc2Page";
import { solicitorCaseCreateType, uploadOrderC100Options } from "../../../../common/types";
import { TestingSupportDummyAdminCreateNoc3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc3Page";
import { CreateAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/SubmitPage";
import { CaseListPage } from "../../../../pages/manageCases/caseList/caseListPage";
import { C100ManageOrdersUploadJourney } from "./c100ManageOrdersUploadJourney.ts";

interface C100Params {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
  yesNoManageOrders: boolean;
  uploadOrderC100Options: uploadOrderC100Options;
}

export class C100UploadAnOrder {
  public static async c100UploadAnOrder({
                                          page,
                                          accessibilityTest,
                                          solicitorCaseCreateType,
                                          yesNoManageOrders,
                                          uploadOrderC100Options,
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
      await C100ManageOrdersUploadJourney.c100ManageOrdersUploadJourney({
        page,
        accessibilityTest,
        yesNoManageOrders,
        uploadOrderC100Options,
      });
    }
  }
}
