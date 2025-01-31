import { Browser, BrowserContext, Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { AdminEditAndApproveAnOrder1Page } from "../../../../../pages/manageCases/caseProgression/manageOrders/serveApprovedOrder/adminEditAndApproveAnOrder1Page.ts";
import { AdminEditAndApproveAnOrder4Page } from "../../../../../pages/manageCases/caseProgression/manageOrders/serveApprovedOrder/adminEditAndApproveAnOrder4Page.ts";
import { AdminEditAndApproveAnOrder21Page } from "../../../../../pages/manageCases/caseProgression/manageOrders/serveApprovedOrder/adminEditAndApproveAnOrder21Page.ts";
import { AdminEditAndApproveAnOrder22Page } from "../../../../../pages/manageCases/caseProgression/manageOrders/serveApprovedOrder/adminEditAndApproveAnOrder22Page.ts";
import { AdminEditAndApproveAnOrder23Page } from "../../../../../pages/manageCases/caseProgression/manageOrders/serveApprovedOrder/adminEditAndApproveAnOrder23Page.ts";
import { AdminEditAndApproveAnOrderSubmitPage } from "../../../../../pages/manageCases/caseProgression/manageOrders/serveApprovedOrder/adminEditAndApproveAnOrderSubmitPage.ts";
import config from "../../../../../config.ts";
import Config from "../../../../../config.ts";
import { EditAndApproveAnOrder } from "../editAndApproveAnOrder/editAndApproveAnOrder.ts";
import { Fl401AddCaseNumber1Page } from "../../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumber1Page.ts";
import { Fl401AddCaseNumberSubmitPage } from "../../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumberSubmitPage.ts";

interface AdminEditAndApproveOrderParams {
  page: Page;
  accessibilityTest: boolean;
  browser: Browser;
  personallyServed: boolean;
}

export class AdminEditAndApproveAnOrder {
  public static async adminEditAndApproveAnOrder({
    page,
    accessibilityTest,
    browser,
    personallyServed,
  }: AdminEditAndApproveOrderParams): Promise<void> {
    const caseRef: string = await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
      caseType: "FL401",
      orderType: "nonMolestation",
      judeOrderAction: "Send to admin to serve",
      errorMessaging: false,
      accessibilityTest: accessibilityTest,
      browser: browser,
    });
    // open new browser and sign in as court admin user
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "caseWorker.json",
    });
    page = await newContext.newPage();
    await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "tasks");
    // check application task needs to be completed for the Edit and serve an order event
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Check Application",
      "Add Case Number",
    );
    await Fl401AddCaseNumber1Page.fl401AddCaseNumber1Page(
      page,
      accessibilityTest,
    );
    await Fl401AddCaseNumberSubmitPage.fl401AddCaseNumberSubmitPage(
      page,
      accessibilityTest,
    );
    await Helpers.chooseEventFromDropdown(page, "Edit and serve an order");
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
