import { Page, Browser } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
  solicitorCaseCreateType,
  uploadOrderC100Options,
  uploadOrderFL401Options,
} from "../../../../common/types.ts";
import Config from "../../../../utils/config.utils.ts";
import { DraftAnOrder1Page } from "../../../../pages/manageCases/caseWorker/draftAnOrder/draftAnOrder1Page.ts";
import { UploadDraftAnOrder3Page } from "../../../../pages/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrder3Page.ts";
import { UploadDraftAnOrder4Page } from "../../../../pages/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrder4Page.ts";
import { C100DraftOrdersTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100DraftOrdersTabPage.ts";
import { UploadDraftAnOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrderSubmitPage.ts";
import { CaseEventUtils } from "../../../../utils/caseEvent.utils.js";

interface FL401DraftAnOrderOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderC100Options?: uploadOrderC100Options;
  uploadOrderFL401Options?: uploadOrderFL401Options;
  solicitorCaseCreateType: solicitorCaseCreateType;
  errorMessaging: boolean;
  browser: Browser;
  isUploadOrder: boolean;
  hasJudgeNameAndTitle: boolean;
}

export class UploadAnOrderFL401SolicitorJourney {
  public static async uploadAnOrderFL401SolicitorJourney({
    page,
    accessibilityTest,
    yesNoManageOrders,
    uploadOrderC100Options,
    uploadOrderFL401Options,
    solicitorCaseCreateType,
    errorMessaging,
    isUploadOrder,
    browser,
    hasJudgeNameAndTitle,
  }: FL401DraftAnOrderOptions): Promise<void> {
    const caseEventUtils = new CaseEventUtils();
    const caseRef: string = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "Summary",
    );
    //Starting the 'Create/upload draft order' event to upload the order
    await Helpers.chooseEventFromDropdown(page, "Create/upload draft order");
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
      hasJudgeNameAndTitle,
    });
    await UploadDraftAnOrderSubmitPage.uploadDraftAnOrderSubmitPage({
      page,
      accessibilityTest,
      solicitorCaseCreateType,
      hasJudgeNameAndTitle,
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
    //Validating if the 'Order made by' is present in the 'Draft orders' tab
    //The file below is the same for FL401 in this journey, but it's also used else where, so won't rename it to remove "C100.."
    await C100DraftOrdersTabPage.c100DraftOrdersTabPage(
      checkPageCTSC,
      accessibilityTest,
      hasJudgeNameAndTitle,
    );
  }
}
