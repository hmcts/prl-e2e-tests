import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { EditAndApproveAnOrder2Page } from "../../../../pages/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder2Page.ts";
import { JudgeOrderAction, OrderType } from "../../../../common/types.ts";
import { EditAndApproveAnOrder21Page } from "../../../../pages/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder21Page.ts";
import { EditAndApproveAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrderSubmitPage.ts";
import { EditAndApproveAnOrderConfirmPage } from "../../../../pages/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrderConfirmPage.ts";
import { orderTypesMap } from "../draftAnOrder/draftAnOrder.ts";

interface EditAndApproveOrderParams {
  page: Page;
  orderType: OrderType;
  judeOrderAction: JudgeOrderAction;
  errorMessaging: boolean;
  accessibilityTest: boolean;
}

export class EditAndApproveAnOrder {
  public static async editAndApproveAnOrder({
    page,
    orderType,
    judeOrderAction,
    errorMessaging,
    accessibilityTest,
  }: EditAndApproveOrderParams): Promise<void> {
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
