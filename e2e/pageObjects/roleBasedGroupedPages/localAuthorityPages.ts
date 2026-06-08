import { Page } from "@playwright/test";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { TasksPage } from "../pages/exui/caseView/tasks.po.ts";

export class LocalAuthorityPagesGroup {
  constructor(public readonly page: Page) {}

  get summaryPage() {
    return new SummaryPage(this.page);
  }

  get tasksPage() {
    return new TasksPage(this.page);
  }
}
