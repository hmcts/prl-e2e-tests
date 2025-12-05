import { Page } from "@playwright/test";
import { TasksPage } from "../pages/exui/caseView/tasks.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { C100Noc1Page } from "../pages/exui/noticeOfChange/c100Noc1Page.po.ts";
import { C100Noc2Page } from "../pages/exui/noticeOfChange/c100Noc2Page.po.ts";
import { C100NocSubmitPage } from "../pages/exui/noticeOfChange/c100NocSubmitPage.po.ts";
import { C100NocConfirmationPage } from "../pages/exui/noticeOfChange/c100NocConfirmationPage.po.ts";
import { C100AdminAddBarrister1Page } from "../pages/exui/addAndRemoveBarrister/c100AdminAddBarrister1.po.ts";
import { C100AdminAddBarristerSubmit } from "../pages/exui/addAndRemoveBarrister/c100AdminAddBarristerSubmit.po.ts";
import { C100AdminRemoveBarrister1Page } from "../pages/exui/addAndRemoveBarrister/c100AdminRemoveBarrister1Page.po.ts";
import { C100AdminRemoveBarristerSubmit } from "../pages/exui/addAndRemoveBarrister/c100AdminRemoveBarristerSubmit.po.ts";
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
    return {
      page1: new C100Noc1Page(this.page),
      page2: new C100Noc2Page(this.page),
      submitPage: new C100NocSubmitPage(this.page),
      confirmPage: new C100NocConfirmationPage(this.page),
    };
  }

  get manageBarristerC100() {
    return {
      addBarrister1Page: new C100AdminAddBarrister1Page(this.page),
      addBarristerSubmit: new C100AdminAddBarristerSubmit(this.page),
      removeBarrister1Page: new C100AdminRemoveBarrister1Page(this.page),
      removeBarristerSubmit: new C100AdminRemoveBarristerSubmit(this.page),
    };
  }
}
