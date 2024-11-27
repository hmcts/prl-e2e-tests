import { Page, expect, Browser, BrowserContext } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { AdminEditAndApproveAnOrder1Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder1Page";
import {
  JudgeOrderAction,
  OrderType,
  solicitorCaseCreateType,
} from "../../../../common/types";
import { AdminEditAndApproveAnOrder4Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder4Page";
import { AdminEditAndApproveAnOrder21Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder21Page";
import { AdminEditAndApproveAnOrder22Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder22Page";
import { AdminEditAndApproveAnOrder23Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder23Page";
import { AdminEditAndApproveAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrderSubmitPage";
import { DraftAnOrder, orderTypesMap } from "../draftAnOrder/draftAnOrder";
import config from "../../../../config";

interface AdminEditAndApproveOrderParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
  browser: Browser;
}

export class AdminEditAndApproveAnOrder {
  public static async editAndApproveAnOrder({
    page,
    caseType,
    accessibilityTest,
    browser,
  }: AdminEditAndApproveOrderParams): Promise<void> {
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
    await AdminEditAndApproveAnOrder1Page.adminEditAndApproveAnOrder1Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrder4Page.adminEditAndApproveAnOrder4Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrder21Page.adminEditAndApproveAnOrder21Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrder22Page.adminEditAndApproveAnOrder22Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrder23Page.adminEditAndApproveAnOrder23Page(
      page,
      accessibilityTest,
    );
    await AdminEditAndApproveAnOrderSubmitPage.adminEditAndApproveAnOrderSubmitPage(
      page,
      accessibilityTest,
    );
  }
}
