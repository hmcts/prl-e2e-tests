import { Page } from "@playwright/test";
import { TasksPage } from "../../pageObjects/pages/exui/caseView/tasks.po.ts";
import { IssueAndSendToLocalCourtCallback1Page } from "../../pageObjects/pages/exui/issueAndSendToLocalCourt/issueAndSendToLocalCourtCallback1.po.ts";
import { IssueAndSendToLocalCourtCallbackSubmitPage } from "../../pageObjects/pages/exui/issueAndSendToLocalCourt/issueAndSendToLocalCourtCallbackSubmit.po.ts";
import { SummaryPage } from "../../pageObjects/pages/exui/caseView/summary.po.ts";
import { C100RemoveLegalRepresentative1Page } from "../../pageObjects/pages/exui/removeLegalRepresentation/c100RemoveLegalRepresentative1.po.ts";
import { C100RemoveLegalRepresentativeSubmitPage } from "../../pageObjects/pages/exui/removeLegalRepresentation/c100RemoveLegalRepresentativeSubmit.po.ts";
import { C100RemoveLegalRepresentativeConfirmPage } from "../../pageObjects/pages/exui/removeLegalRepresentation/c100RemoveLegalRepresentativeConfirm.po.ts";
import { PartiesPage } from "../../pageObjects/pages/exui/caseView/parties.po.ts";
import { Fl401RemoveLegalRepresentative1Page } from "../../pageObjects/pages/exui/removeLegalRepresentation/fl401RemoveLegalRepresentative1.po.ts";
import { Fl401RemoveLegalRepresentativeSubmitPage } from "../../pageObjects/pages/exui/removeLegalRepresentation/fl401RemoveLegalRepresentativeSubmit.po.ts";
import { Fl401RemoveLegalRepresentativeConfirmPage } from "../../pageObjects/pages/exui/removeLegalRepresentation/fl401RemoveLegalRepresentativeConfirm.po.ts";

export class CourtAdminStokePagesGroup {
  readonly tasksPage: TasksPage;
  readonly issueAndSendToLocalCourtCallback1Page: IssueAndSendToLocalCourtCallback1Page;
  readonly issueAndSendToLocalCourtCallbackSubmitPage: IssueAndSendToLocalCourtCallbackSubmitPage;
  readonly summaryPage: SummaryPage;
  readonly c100RemoveLegalRepresentative1Page: C100RemoveLegalRepresentative1Page;
  readonly c100RemoveLegalRepresentativeSubmitPage: C100RemoveLegalRepresentativeSubmitPage;
  readonly c100RemoveLegalRepresentativeConfirmPage: C100RemoveLegalRepresentativeConfirmPage;
  readonly partiesPage: PartiesPage;
  readonly fl401RemoveLegalRepresentative1Page: Fl401RemoveLegalRepresentative1Page;
  readonly fl401RemoveLegalRepresentativeSubmitPage: Fl401RemoveLegalRepresentativeSubmitPage;
  readonly fl401RemoveLegalRepresentativeConfirmPage: Fl401RemoveLegalRepresentativeConfirmPage;

  constructor(public page: Page) {
    this.tasksPage = new TasksPage(page);
    this.issueAndSendToLocalCourtCallback1Page =
      new IssueAndSendToLocalCourtCallback1Page(page);
    this.issueAndSendToLocalCourtCallbackSubmitPage =
      new IssueAndSendToLocalCourtCallbackSubmitPage(page);
    this.summaryPage = new SummaryPage(page);
    this.c100RemoveLegalRepresentative1Page =
      new C100RemoveLegalRepresentative1Page(page);
    this.c100RemoveLegalRepresentativeSubmitPage =
      new C100RemoveLegalRepresentativeSubmitPage(page);
    this.c100RemoveLegalRepresentativeConfirmPage =
      new C100RemoveLegalRepresentativeConfirmPage(page);
    this.partiesPage = new PartiesPage(page);
    this.fl401RemoveLegalRepresentative1Page =
      new Fl401RemoveLegalRepresentative1Page(page);
    this.fl401RemoveLegalRepresentativeSubmitPage =
      new Fl401RemoveLegalRepresentativeSubmitPage(page);
    this.fl401RemoveLegalRepresentativeConfirmPage =
      new Fl401RemoveLegalRepresentativeConfirmPage(page);
  }
}
