import { Browser, BrowserContext, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { AdminEditAndApproveAnOrder1Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder1Page.ts";
import { AdminEditAndApproveAnOrder4Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder4Page.ts";
import { AdminEditAndApproveAnOrder21Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder21Page.ts";
import { AdminEditAndApproveAnOrder22Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder22Page.ts";
import { AdminEditAndApproveAnOrder23Page } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder23Page.ts";
import { AdminEditAndApproveAnOrderSubmitPage } from "../../../../pages/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrderSubmitPage.ts";
import config from "../../../../utils/config.utils.ts";
import Config from "../../../../utils/config.utils.ts";
import { EditAndApproveAnOrder } from "../editAndApproveAnOrder/editAndApproveAnOrder.ts";
import { Fl401AddCaseNumber1Page } from "../../../../pageObjects/pages/exui/checkApplication/fl401AddCaseNumber1.po.js";
import { Fl401AddCaseNumberSubmitPage } from "../../../../pageObjects/pages/exui/checkApplication/fl401AddCaseNumberSubmit.po.js";
import { AxeUtils } from "@hmcts/playwright-common";

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
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
      caseType: "FL401",
      orderType: "nonMolestation",
      judeOrderAction: "Send to admin to serve",
      errorMessaging: false,
      accessibilityTest: accessibilityTest,
      browser: browser,
      caseRef: caseRef,
    });
    // open new browser and sign in as court admin user
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "caseWorker.json",
    });
    page = await newContext.newPage();
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    // check application task needs to be completed for the Edit and serve an order event
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Check Application",
      "Add Case Number",
    );

    let axeUtils: AxeUtils;
    if (accessibilityTest) {
      axeUtils = new AxeUtils(page);
    }

    const fl401AddCaseNumber1Page = new Fl401AddCaseNumber1Page(page);
    await fl401AddCaseNumber1Page.assertPageContents();
    if (accessibilityTest) {
      await axeUtils.audit();
    }
    await fl401AddCaseNumber1Page.fillInFields("1234");
    await fl401AddCaseNumber1Page.continueButton.click();

    const fl401AddCaseNumberSubmitPage = new Fl401AddCaseNumberSubmitPage(page);
    await fl401AddCaseNumberSubmitPage.assertPageContents("check-application");
    if (accessibilityTest) {
      await axeUtils.audit();
    }
    await fl401AddCaseNumberSubmitPage.clickSubmit();

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
