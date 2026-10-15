import { Page } from "@playwright/test";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { TasksPage } from "../pages/exui/caseView/tasks.po.ts";
import { ManageDocumentsNew1Page } from "../pages/exui/manageDocuments/manageDocumentsNew1.po.ts";
import { ManageDocumentsNewSubmitPage } from "../pages/exui/manageDocuments/manageDocumentsNewSubmit.po.ts";
import { ManageDocumentsNewConfirmPage } from "../pages/exui/manageDocuments/manageDocumentsNewConfirm.po.ts";

export class LocalAuthorityPagesGroup {
  constructor(public readonly page: Page) {}

  get summaryPage() {
    return new SummaryPage(this.page);
  }

  get tasksPage() {
    return new TasksPage(this.page);
  }

  get manageDocuments() {
    return {
      manageDocumentsNew1Page: new ManageDocumentsNew1Page(this.page),
      manageDocumentsNewSubmitPage: new ManageDocumentsNewSubmitPage(this.page),
      manageDocumentsNewConfirmPage: new ManageDocumentsNewConfirmPage(
        this.page,
      ),
    };
  }
}
