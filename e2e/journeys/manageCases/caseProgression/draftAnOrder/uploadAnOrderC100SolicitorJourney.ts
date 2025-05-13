import { Page, Browser } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
  solicitorCaseCreateType,
  uploadOrderC100Options,
  uploadOrderFL401Options,
} from "../../../../common/types.ts";
import Config from "../../../../config.ts";
import { SolicitorCACaseCreator } from "../../../../common/caseHelpers/solicitorCACaseCreator.ts";
import { DraftAnOrder1Page } from "../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder1Page.ts";
import { UploadDraftAnOrder3Page } from "../../../../pages/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrder3Page.ts";
import { UploadDraftAnOrder4Page } from "../../../../pages/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrder4Page.ts";
import config from "../../../../../jest.config.ts";
import { C100DraftOrdersTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100DraftOrdersTabPage.ts";

interface C100ManageOrdersOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderC100Options?: uploadOrderC100Options;
  uploadOrderFL401Options?: uploadOrderFL401Options;
  solicitorCaseCreateType: solicitorCaseCreateType;
  errorMessaging: boolean;
  isUploadOrder: boolean;
  browser: Browser,
}

export class UploadAnOrderC100SolicitorJourney {
  public static async uploadAnOrderC100SolicitorJourney({
    page,
    accessibilityTest,
    yesNoManageOrders,
    uploadOrderC100Options,
    uploadOrderFL401Options,
    solicitorCaseCreateType,
    errorMessaging,
    isUploadOrder,
    browser,
  }: C100ManageOrdersOptions): Promise<void> {
    // //CA case creation
    let caseRef: string;
    await page.goto(Config.manageCasesBaseURLCase);
    caseRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
//Starting the 'Draft an order' event to upload the order
    await Helpers.chooseEventFromDropdown(page, `Draft an order`);
    await DraftAnOrder1Page.draftAnOrder1Page(
        page,
        errorMessaging,
        accessibilityTest,
        isUploadOrder,
    );
    await UploadDraftAnOrder3Page.uploadDraftAnOrder3Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
      uploadOrderC100Options,
      uploadOrderFL401Options,
      solicitorCaseCreateType,
    });
    await UploadDraftAnOrder4Page.uploadDraftAnOrder4Page({
      page,
      accessibilityTest,
      isUploadOrder,
      solicitorCaseCreateType,
    });
    const checkPageCTSC: Page = await Helpers.openNewBrowserWindow(
          browser,
          "courtAdminStoke",
        );
        await Helpers.goToCase(
          checkPageCTSC,
          config.manageCasesBaseURLCase,
          caseRef,
          "Draft orders",
        );
    //Validating the correct Judge's Name in the 'Draft orders' tab
    await Helpers.clickTab(page, "Draft orders");
    await C100DraftOrdersTabPage.c100DraftOrdersTabPage(
      page,
      accessibilityTest,
    );
  }
}
