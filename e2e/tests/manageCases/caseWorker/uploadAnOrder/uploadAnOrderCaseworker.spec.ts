import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { CaseListPage } from "../../../../pages/manageCases/caseList/caseListPage.ts";
import { CaseFilterPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/caseFilterPage.ts";
import { TestingSupportDummyAdminCreateNoc2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc2Page.ts";
import { TestingSupportDummyAdminCreateNoc3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc3Page.ts";
import { CreateAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/SubmitPage.ts";
import { C100ManageOrdersUploadJourney } from "../../../../journeys/manageCases/caseWorker/uploadAnOrder/c100ManageOrdersUploadJourney.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("'Upload an order' tests", (): void => {
  test.beforeEach(async ({ page }) => {
    //Test setup no accessibility test needed
    await CaseListPage.navigateToCreateCasePage(page);
    await CaseFilterPage.caseFilterPage({ page, accessibilityTest: false });
    await TestingSupportDummyAdminCreateNoc2Page.testingSupportDummyAdminCreateNoc2Page(
      { page, accessibilityTest: false, solicitorCaseCreateType: "C100" },
    );
    await TestingSupportDummyAdminCreateNoc3Page.testingSupportDummyAdminCreateNoc3Page(
      { page, accessibilityTest: false, solicitorCaseCreateType: "C100" },
    );
    await CreateAnOrderSubmitPage.createAnOrderSubmitPage({
      page,
      accessibilityTest: false,
    });
  });

  test(`Complete 'Upload an order' as a Caseworker with the following options:
  Case: C100,
  Not accessibility testing. 
  @regression, @nightly`, async ({ page }): Promise<void> => {
    await C100ManageOrdersUploadJourney.c100ManageOrdersUploadJourney({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "C100",
      yesNoManageOrders: false,
      uploadOrderC100Options:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isUploadOrder: true,
      serveOrderNow: false,
      hasJudgeNameAndTitle: true,
    });
  });

  test(`Complete 'Upload an order' as a Caseworker with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @regression, @nightly`, async ({ page }): Promise<void> => {
    await C100ManageOrdersUploadJourney.c100ManageOrdersUploadJourney({
      page: page,
      accessibilityTest: true,
      solicitorCaseCreateType: "C100",
      yesNoManageOrders: false,
      uploadOrderC100Options:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isUploadOrder: true,
      serveOrderNow: false,
      hasJudgeNameAndTitle: true,
    });
  });
});
//triggering tests on jenkins