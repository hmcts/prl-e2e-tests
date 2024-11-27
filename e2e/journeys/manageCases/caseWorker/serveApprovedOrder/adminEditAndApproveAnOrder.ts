import { Browser, BrowserContext, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { AdminEditAndApproveAnOrder1Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder1Page";
import { AdminEditAndApproveAnOrder4Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder4Page";
import { AdminEditAndApproveAnOrder21Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder21Page";
import { AdminEditAndApproveAnOrder22Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder22Page";
import { AdminEditAndApproveAnOrder23Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder23Page";
import { AdminEditAndApproveAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrderSubmitPage";
import config from "../../../../config";
import Config from "../../../../config";
import { EditAndApproveAnOrder } from "../editAndApproveAnOrder/editAndApproveAnOrder";
import { Fl401AddCaseNumber1Page } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumber1Page";
import { Fl401AddCaseNumberSubmitPage } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumberSubmitPage";

interface AdminEditAndApproveOrderParams {
  page: Page;
  accessibilityTest: boolean;
  browser: Browser;
}

export class AdminEditAndApproveAnOrder {
  public static async adminEditAndApproveAnOrder({
    page,
    accessibilityTest,
    browser,
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
    );

    await AdminEditAndApproveAnOrderSubmitPage.adminEditAndApproveAnOrderSubmitPage(
      page,
      accessibilityTest,
    );
  }
}
