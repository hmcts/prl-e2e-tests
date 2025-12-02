import { Page } from "@playwright/test";
import { TasksPage } from "../../pageObjects/pages/exui/caseView/tasks.po.ts";
import { SummaryPage } from "../../pageObjects/pages/exui/caseView/summary.po.ts";
import { C100Noc1Page } from "../../pageObjects/pages/exui/noticeOfChange/c100Noc1Page.po.ts";
import { C100Noc2Page } from "../../pageObjects/pages/exui/noticeOfChange/c100Noc2Page.po.ts";
import { C100NocSubmitPage } from "../../pageObjects/pages/exui/noticeOfChange/c100NocSubmitPage.po.ts";
import { C100NocConfirmationPage } from "../../pageObjects/pages/exui/noticeOfChange/c100NocConfirmationPage.po.ts";
import { C100AdminAddBarrister1Page } from "../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminAddBarrister1.po.ts";
import { C100AdminAddBarristerSubmit } from "../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminAddBarristerSubmit.po.ts";
import { C100AdminRemoveBarrister1Page } from "../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminRemoveBarrister1Page.po.ts";
import { C100AdminRemoveBarristerSubmit } from "../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminRemoveBarristerSubmit.po.ts";
import { PartiesPage } from "../../pageObjects/pages/exui/caseView/parties.po.ts";

export class NocSolicitorPagesGroup {
  readonly tasksPage: TasksPage;
  readonly c100Noc1Page: C100Noc1Page;
  readonly c100Noc2Page: C100Noc2Page;
  readonly c100NocSubmitPage: C100NocSubmitPage;
  readonly summaryPage: SummaryPage;
  readonly c100NocConfirmationPage: C100NocConfirmationPage;
  readonly c100AdminAddBarrister1Page: C100AdminAddBarrister1Page;
  readonly c100AdminAddBarristerSubmit: C100AdminAddBarristerSubmit;
  readonly c100AdminRemoveBarrister1Page: C100AdminRemoveBarrister1Page;
  readonly c100AdminRemoveBarristerSubmit: C100AdminRemoveBarristerSubmit;
  readonly partiesPage: PartiesPage;

  constructor(public page: Page) {
    this.tasksPage = new TasksPage(page);
    this.c100Noc1Page = new C100Noc1Page(page);
    this.c100Noc2Page = new C100Noc2Page(page);
    this.c100NocSubmitPage = new C100NocSubmitPage(page);
    this.summaryPage = new SummaryPage(page);
    this.c100NocConfirmationPage = new C100NocConfirmationPage(page);
    this.c100AdminAddBarrister1Page = new C100AdminAddBarrister1Page(page);
    this.c100AdminAddBarristerSubmit = new C100AdminAddBarristerSubmit(page);
    this.c100AdminRemoveBarrister1Page = new C100AdminRemoveBarrister1Page(
      page,
    );
    this.c100AdminRemoveBarristerSubmit = new C100AdminRemoveBarristerSubmit(
      page,
    );
    this.partiesPage = new PartiesPage(page);
  }
}
