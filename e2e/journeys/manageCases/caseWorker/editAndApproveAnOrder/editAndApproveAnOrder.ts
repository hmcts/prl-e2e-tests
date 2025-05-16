import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { EditAndApproveAnOrder2Page } from "../../../../pages/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder2Page";
import {
  JudgeOrderAction,
  OrderType,
  solicitorCaseCreateType,
} from "../../../../common/types";
import { EditAndApproveAnOrder21Page } from "../../../../pages/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder21Page";
import { EditAndApproveAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrderSubmitPage";
import { EditAndApproveAnOrderConfirmPage } from "../../../../pages/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrderConfirmPage";
import { DraftAnOrder, orderTypesMap } from "../draftAnOrder/draftAnOrder";
import config from "../../../../config";

interface EditAndApproveOrderParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  orderType: OrderType;
  judeOrderAction: JudgeOrderAction;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  browser: Browser;
  caseRef: string;
}

export class EditAndApproveAnOrder {
  public static async editAndApproveAnOrder({
    page,
    caseType,
    orderType,
    judeOrderAction,
    errorMessaging,
    accessibilityTest,
    browser,
    caseRef,
  }: EditAndApproveOrderParams): Promise<void> {
    // Draft the order and get case ref to be used to find case
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: errorMessaging,
      accessibilityTest: accessibilityTest,
      caseType: caseType,
      orderType: orderType,
      yesNoToAll: false,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: true,
      browser: browser,
      caseRef: caseRef,
      checkPdf: false,
      isUploadOrder: false,
    });
    page = await Helpers.openNewBrowserWindow(browser, "judge");
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      `${orderTypesMap.get(orderType)}`,
      "Review and Approve Legal rep Order",
    );
    await EditAndApproveAnOrder2Page.editAndApproveAnOrder2Page(
      page,
      orderType,
      judeOrderAction,
      errorMessaging,
      accessibilityTest,
    );
    if (judeOrderAction === "Give admin further directions then serve") {
      await EditAndApproveAnOrder21Page.editAndApproveAnOrder21Page(
        page,
        orderType,
        accessibilityTest,
      );
    }
    await EditAndApproveAnOrderSubmitPage.editAndApproveAnOrderSubmitPage(
      page,
      orderType,
      judeOrderAction,
      accessibilityTest,
    );
    await EditAndApproveAnOrderConfirmPage.editAndApproveOrderConfirmPage(
      page,
      judeOrderAction,
      accessibilityTest,
    );
  }
}
