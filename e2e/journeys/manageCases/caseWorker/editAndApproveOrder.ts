import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { Helpers } from "../../../common/helpers";
import { EditAndApproveAnOrder2Page } from "../../../pages/manageCases/caseWorker/editAndApproveAnOrder2Page";
import { JudgeOrderAction, OrderType } from "../../../common/types";
import { EditAndApproveAnOrder21Page } from "../../../pages/manageCases/caseWorker/editAndApproveAnOrder21Page";
import { EditAndApproveAnOrderSubmitPage } from "../../../pages/manageCases/caseWorker/editAndApproveAnOrderSubmitPage";
import { EditAndApproveAnOrderConfirmPage } from "../../../pages/manageCases/caseWorker/editAndApproveAnOrderConfirmPage";

interface EditAndApproveOrderParams {
  page: Page;
  orderType: OrderType;
  judeOrderAction: JudgeOrderAction;
  errorMessaging: boolean;
  accessibilityTest: boolean;
}

export class EditAndApproveOrder {
  public static async editAndApproveOrder({
    page,
    orderType,
    judeOrderAction,
    errorMessaging,
    accessibilityTest,
  }: EditAndApproveOrderParams): Promise<void> {
    // Draft the order and get case ref to be used to find case - TODO: return string from draft an order journey
    const caseRef: string = "test"; // draftAnOrder();
    // TODO: sign in as judge
    await page.fill("#caseReference", caseRef);
    await page.click(`${Selectors.GovukButton}:text-is("Find")`);
    await page.click(`".mat-tab-label-content":text-is("Tasks")`);
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
