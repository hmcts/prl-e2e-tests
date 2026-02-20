import { Page } from "@playwright/test";
import { SendToGateKeeper1Page } from "../pages/exui/sendToGateKeeper/sendToGateKeeper1.po";
import { SendToGateKeeperSubmitPage } from "../pages/exui/sendToGateKeeper/sendToGateKeeperSubmit.po";
import { TasksPage } from "../pages/exui/caseView/tasks.po";
import { SummaryPage } from "../pages/exui/caseView/summary.po";
import { RolesAndAccessPage } from "../pages/exui/caseView/rolesAndAccess.po";

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
