import { test } from "@playwright/test";
import Config from "../../../../config.ts";
import config from "../../../../../jest.config.ts";
import { CaseListPage } from "../../../../pages/manageCases/caseList/caseListPage.ts";
import { CaseFilterPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/caseFilterPage.ts";
import { TestingSupportDummyAdminCreateNoc2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc2Page.ts";
import { TestingSupportDummyAdminCreateNoc3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc3Page.ts";
import { CreateAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/initialJourney/SubmitPage.ts";
import { C100ManageOrdersUploadJourney } from "../../../../journeys/manageCases/caseWorker/uploadAnOrder/c100ManageOrdersUploadJourney.ts";
import { UploadAnOrderC100SolicitorJourney } from "../../../../journeys/manageCases/caseProgression/draftAnOrder/uploadAnOrderC100SolicitorJourney.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("'Upload an order' by Solicitor via the 'Draft an Order' event tests", (): void => {
  let caseRef: string;
  test(`Complete 'Upload an order' as a Solicitor with the following options:
  Case: C100,
  Not accessibility testing. 
  @regression, @nightly`, async ({ page, browser }): Promise<void> => {
    await UploadAnOrderC100SolicitorJourney.uploadAnOrderC100SolicitorJourney({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "C100",
      yesNoManageOrders: false,
      uploadOrderC100Options:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isUploadOrder: true,
      errorMessaging: false,
      browser: browser,
    });
  });

  // test(`Complete 'Upload an order' as a Solicitor with the following options:
  // Case: C100,
  // Accessibility testing: yes. 
  // @regression, @nightly`, async ({ page }): Promise<void> => {
  //   await C100ManageOrdersUploadJourney.c100ManageOrdersUploadJourney({
  //     page: page,
  //     accessibilityTest: true,
  //     solicitorCaseCreateType: "C100",
  //     yesNoManageOrders: false,
  //     uploadOrderC100Options:
  //       "Child arrangements, specific issue or prohibited steps order (C43)",
  //     isUploadOrder: true,
  //   });
  // });

  // test(`Complete 'Upload an order' as a Solicitor with the following options:
  // Case: FL401,
  // Accessibility testing: yes. 
  // @regression, @nightly`, async ({ page }): Promise<void> => {
  //   await C100ManageOrdersUploadJourney.c100ManageOrdersUploadJourney({
  //     page: page,
  //     accessibilityTest: true,
  //     solicitorCaseCreateType: "FL401",
  //     yesNoManageOrders: false,
  //     uploadOrderFL401Options:
  //       "Child arrangements, specific issue or prohibited steps order (C43)",
  //     isUploadOrder: true,
  //   });
  // });

  // test(`Complete 'Upload an order' as a Solicitor with the following options:
  // Case: FL401,
  // Accessibility testing: yes. 
  // @regression, @nightly`, async ({ page }): Promise<void> => {
  //   await C100ManageOrdersUploadJourney.c100ManageOrdersUploadJourney({
  //     page: page,
  //     accessibilityTest: true,
  //     solicitorCaseCreateType: "FL401",
  //     yesNoManageOrders: false,
  //     uploadOrderFL401Options:
  //       "Child arrangements, specific issue or prohibited steps order (C43)",
  //     isUploadOrder: true,
  //   });
  // });
});
