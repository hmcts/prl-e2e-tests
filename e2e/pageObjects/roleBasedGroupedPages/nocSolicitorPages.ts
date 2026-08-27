import { Page } from "@playwright/test";
import { TasksPage } from "../pages/exui/caseView/tasks.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { NoticeOfChange1Page } from "../pages/exui/noticeOfChange/noticeOfChange1.po.ts";
import { NoticeOfChange2Page } from "../pages/exui/noticeOfChange/noticeOfChange2.po.ts";
import { NoticeOfChangeSubmitPage } from "../pages/exui/noticeOfChange/noticeOfChangeSubmit.po.ts";
import { NoticeOfChangeConfirmationPage } from "../pages/exui/noticeOfChange/noticeOfChangeConfirmation.po.ts";
import { AddBarrister1Page } from "../pages/exui/addAndRemoveBarrister/addBarrister1.po.ts";
import { AddBarristerSubmitPage } from "../pages/exui/addAndRemoveBarrister/addBarristerSubmit.po.ts";
import { RemoveBarrister1Page } from "../pages/exui/addAndRemoveBarrister/removeBarrister1.po.ts";
import { RemoveBarristerSubmitPage } from "../pages/exui/addAndRemoveBarrister/removeBarristerSubmit.po.ts";
import { PartiesPage } from "../pages/exui/caseView/parties.po.ts";

export class NocSolicitorPagesGroup {
  constructor(public readonly page: Page) {}

  get tasksPage() {
    return new TasksPage(this.page);
  }
  get summaryPage() {
    return new SummaryPage(this.page);
  }
  get partiesPage() {
    return new PartiesPage(this.page);
  }

  get noticeOfChangeC100() {
    return this.noticeOfChange;
  }

  get noticeOfChange() {
    return {
      page1: new NoticeOfChange1Page(this.page),
      page2: new NoticeOfChange2Page(this.page),
      submitPage: new NoticeOfChangeSubmitPage(this.page),
      confirmPage: new NoticeOfChangeConfirmationPage(this.page),
    };
  }

  get manageBarristerC100() {
    return this.manageBarrister;
  }

  get manageBarrister() {
    return {
      addBarrister1Page: new AddBarrister1Page(this.page),
      addBarristerSubmit: new AddBarristerSubmitPage(this.page),
      removeBarrister1Page: new RemoveBarrister1Page(this.page),
      removeBarristerSubmit: new RemoveBarristerSubmitPage(this.page),
    };
  }
}
