import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
  solicitorCaseCreateType,
  uploadOrderC100Options,
  uploadOrderFL401Options,
} from "../../../../common/types.ts";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders1Page.ts";
import { ManageOrders3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders3Page.ts";
import { ManageOrders8PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders8PageCA.ts";
import { ManageOrders24PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders24PageCA.ts";
import { ManageOrders26PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders26PageCA.ts";
import { C100DraftOrdersTabPage } from "../../../../pages/manageCases/caseTabs/C100/c100DraftOrdersTabPage.ts";
import { ManageOrders5Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/manageOrders5Page.ts";
import { SubmitPageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/SubmitPageCA.ts";

interface C100ManageOrdersOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderC100Options?: uploadOrderC100Options;
  uploadOrderFL401Options?: uploadOrderFL401Options;
  solicitorCaseCreateType: solicitorCaseCreateType;
  isUploadOrder: boolean;
  serveOrderNow: boolean;
  hasJudgeNameAndTitle: boolean;
}

export class C100ManageOrdersUploadJourney {
  public static async c100ManageOrdersUploadJourney({
    page,
    accessibilityTest,
    yesNoManageOrders,
    uploadOrderC100Options,
    uploadOrderFL401Options,
    solicitorCaseCreateType,
    isUploadOrder,
    serveOrderNow,
    hasJudgeNameAndTitle,
  }: C100ManageOrdersOptions): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, `Manage orders`);
    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
      isUploadOrder,
    });
    await ManageOrders3Page.manageOrders3Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
      uploadOrderC100Options,
      uploadOrderFL401Options,
      solicitorCaseCreateType,
    });
    await ManageOrders5Page.manageOrders5Page({
      page,
      accessibilityTest,
      isUploadOrder,
      solicitorCaseCreateType,
    });
    await ManageOrders8PageCA.manageOrders8PageCA({
      page,
      accessibilityTest,
      isUploadOrder,
    });
    await ManageOrders24PageCA.manageOrders24PageCA({
      page,
      accessibilityTest,
    });
    await ManageOrders26PageCA.manageOrders26PageCA({
      page,
      accessibilityTest,
      serveOrderNow,
    });
    await SubmitPageCA.submitPageCA({
      page,
      accessibilityTest,
    });
    //Validating the correct Judge's Name in the 'Draft orders' tab
    await Helpers.clickTab(page, "Draft orders");
    await C100DraftOrdersTabPage.c100DraftOrdersTabPage(
      page,
      accessibilityTest,
      hasJudgeNameAndTitle,
    );
  }
}
