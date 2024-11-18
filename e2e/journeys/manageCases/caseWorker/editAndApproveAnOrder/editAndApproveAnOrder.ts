import { Page, expect, Browser, BrowserContext } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
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
import Config from "../../../../config";

interface EditAndApproveOrderParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  orderType: OrderType;
  judeOrderAction: JudgeOrderAction;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  browser: Browser;
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
    // open new browser and sign in as judge user
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "judge.json",
    });
    page = await newContext.newPage();
    await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "tasks");
    // refresh page until the task shows up - there can be some delay
    await expect
      .poll(
        async () => {
          const visible = await page
            .locator("strong", {
              hasText: `${orderTypesMap.get(orderType)?.journeyName}`,
            })
            .isVisible();
          if (!visible) {
            await page.reload();
          }
          return visible;
        },
        {
          // Allow 10s delay before retrying
          intervals: [10_000],
          // Allow up to a minute for it to become visible
          timeout: 90_000,
        },
      )
      .toBeTruthy();
    await page.click(`${Selectors.a}:text-is("Assign to me")`);
    await page.locator(".alert-message").waitFor();
    await page.click(
      `${Selectors.a}:text-is("Review and Approve Legal rep Order")`,
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
