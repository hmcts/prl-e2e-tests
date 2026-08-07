import { Browser, BrowserContext, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { AdminEditAndApproveAnOrder1Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder1Page.ts";
import { AdminEditAndApproveAnOrder4Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder4Page.ts";
import { AdminEditAndApproveAnOrder21Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder21Page.ts";
import { AdminEditAndApproveAnOrder22Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder22Page.ts";
import { AdminEditAndApproveAnOrder23Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder23Page.ts";
import { AdminEditAndApproveAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrderSubmitPage.ts";
import Config from "../../../../utils/config.utils.ts";
import { EditAndApproveAnOrder } from "../editAndApproveAnOrder/editAndApproveAnOrder.ts";

interface AdminEditAndApproveOrderParams {
  page: Page;
  accessibilityTest: boolean;
  browser: Browser;
  personallyServed: boolean;
  caseRef: string;
}

export class AdminEditAndServeAnOrder {
  public static async adminEditAndServeAnOrder({
    page,
    accessibilityTest,
    browser,
    personallyServed,
    caseRef,
  }: AdminEditAndApproveOrderParams): Promise<void> {
    // open new browser and sign in as judge user to approve order
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "judge.json",
    });
    const judgePage = await newContext.newPage();
    await Helpers.goToCase(
      judgePage,
      Config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: judgePage,
      orderType: "nonMolestation",
      judeOrderAction: "Send to admin to serve",
      errorMessaging: false,
      accessibilityTest: accessibilityTest,
    });
    await judgePage.close();

    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Complete the Order - Non-molestation order (FL404A)",
      "Complete the Order",
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
      personallyServed,
    );
    await AdminEditAndApproveAnOrderSubmitPage.adminEditAndApproveAnOrderSubmitPage(
      page,
      accessibilityTest,
      personallyServed,
    );
  }
}
