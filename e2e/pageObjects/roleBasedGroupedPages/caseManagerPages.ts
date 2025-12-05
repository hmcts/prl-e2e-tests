import { Page } from "@playwright/test";
import { SendToGateKeeper1Page } from "../pages/exui/sendToGateKeeper/sendToGateKeeper1.po.ts";
import { SendToGateKeeperSubmitPage } from "../pages/exui/sendToGateKeeper/sendToGateKeeperSubmit.po.ts";
import { TasksPage } from "../pages/exui/caseView/tasks.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { RolesAndAccessPage } from "../pages/exui/caseView/rolesAndAccess.po.ts";

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
}
