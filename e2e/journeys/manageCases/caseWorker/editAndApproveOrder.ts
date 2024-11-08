import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { Helpers } from "../../../common/helpers";
import { EditAndApproveAnOrder2Page } from "../../../pages/manageCases/caseWorker/editAndApproveAnOrder2Page";
import {
  JudgeOrderAction,
  OrderType,
  solicitorCaseCreateType,
} from "../../../common/types";
import { EditAndApproveAnOrder21Page } from "../../../pages/manageCases/caseWorker/editAndApproveAnOrder21Page";
import { EditAndApproveAnOrderSubmitPage } from "../../../pages/manageCases/caseWorker/editAndApproveAnOrderSubmitPage";
import { EditAndApproveAnOrderConfirmPage } from "../../../pages/manageCases/caseWorker/editAndApproveAnOrderConfirmPage";
import { DraftAnOrder } from "./draftAnOrder/draftAnOrder";
import config from "../../../config";

interface EditAndApproveOrderParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  orderType: OrderType;
  judeOrderAction: JudgeOrderAction;
  errorMessaging: boolean;
  accessibilityTest: boolean;
}

export class EditAndApproveOrder {
  public static async editAndApproveOrder({
    page,
    caseType,
    orderType,
    judeOrderAction,
    errorMessaging,
    accessibilityTest,
  }: EditAndApproveOrderParams): Promise<void> {
    // Draft the order and get case ref to be used to find case
    const caseRef: string = await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: errorMessaging,
      accessibilityTest: accessibilityTest,
      paymentStatusPaid: true,
      caseType: caseType,
      orderType: orderType,
      yesNoToAll: false,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: true,
    });
    await Helpers.signOutAndGoToCase(
      page,
      "judge",
      config.manageCasesBaseURL,
      caseRef,
      "tasks",
    );
    // refresh page until the task shows up - there is some delay
    let visible: boolean = await page
      .locator("strong", { hasText: "Non-molestation order (FL404A)" })
      .isVisible();
    while (!visible) {
      await page.reload();
      await page.waitForTimeout(10000);
      visible = await page
        .locator("strong", { hasText: "Non-molestation order (FL404A)" })
        .isVisible();
    }
    await page.click(`${Selectors.a}:text-is("Assign to me")`);
    await page.locator(".alert-message").waitFor();
    await Helpers.chooseEventFromDropdown(
      page,
      "Edit and approve a draft order",
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
