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
import { C100DraftOrdersTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100DraftOrdersTabPage.ts";
import { UploadDraftAnOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrderSubmitPage.ts";

interface C100DraftAnOrderOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderC100Options?: uploadOrderC100Options;
  uploadOrderFL401Options?: uploadOrderFL401Options;
  solicitorCaseCreateType: solicitorCaseCreateType;
  errorMessaging: boolean;
  isUploadOrder: boolean;
  browser: Browser;
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
  }: C100DraftAnOrderOptions): Promise<void> {
    //CA case creation
    let caseRef: string;
    await page.goto(Config.manageCasesBaseURLCase);
    caseRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "Summary",
    );
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
      solicitorCaseCreateType,
    });
    await UploadDraftAnOrderSubmitPage.uploadDraftAnOrderSubmitPage({
      page,
      accessibilityTest,
      solicitorCaseCreateType,
    });
    //Switching to CTSC user as Solicitor cannot see the 'Draft orders' tab in the case
    const checkPageCTSC: Page = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      checkPageCTSC,
      Config.manageCasesBaseURLCase,
      caseRef,
      "Draft orders",
    );
    //Validating the correct Judge's Name in the 'Draft orders' tab
    await C100DraftOrdersTabPage.c100DraftOrdersTabPage(
      checkPageCTSC,
      accessibilityTest,
    );
  }
}
