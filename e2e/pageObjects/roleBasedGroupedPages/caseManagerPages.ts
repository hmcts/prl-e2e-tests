import { Page } from "@playwright/test";
import { SendToGateKeeper1Page } from "../pages/exui/sendToGateKeeper/sendToGateKeeper1.po.ts";
import { SendToGateKeeperSubmitPage } from "../pages/exui/sendToGateKeeper/sendToGateKeeperSubmit.po.ts";
import { TasksPage } from "../pages/exui/caseView/tasks.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { RolesAndAccessPage } from "../pages/exui/caseView/rolesAndAccess.po.ts";
import { ConfidentialityCheck1Page } from "../pages/exui/confidentialityCheck/confidentialityCheck1.po.js";
import { ConfidentialityCheckSubmitPage } from "../pages/exui/confidentialityCheck/confidentialityCheckSubmit.po.js";
import { ConfidentialityCheckConfirmPage } from "../pages/exui/confidentialityCheck/confidentialityCheckConfirm.po.js";
import { ServiceOfApplicationPage } from "../pages/exui/caseView/serviceOfApplication.po.js";

export class CaseManagerPagesGroup {
  constructor(public readonly page: Page) {}

  get sendToGateKeeper() {
    return {
      page1: new SendToGateKeeper1Page(this.page),
      submitPage: new SendToGateKeeperSubmitPage(this.page),
    };
  }
  get tasksPage() {
    return new TasksPage(this.page);
  }
  get summaryPage() {
    return new SummaryPage(this.page);
  }
  get rolesAndAccessPage() {
    return new RolesAndAccessPage(this.page);
  }
  get confidentialityCheck() {
    return {
      confidentialityCheck1Page: new ConfidentialityCheck1Page(this.page),
      confidentialityCheckSubmitPage: new ConfidentialityCheckSubmitPage(
        this.page,
      ),
      confidentialityCheckConfirmPage: new ConfidentialityCheckConfirmPage(
        this.page,
      ),
    };
  }
  get serviceOfApplication() {
    return {
      serviceOfApplicationPage: new ServiceOfApplicationPage(this.page),
    };
  }
}
