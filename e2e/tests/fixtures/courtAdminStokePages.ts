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

  get issueAndSendToLocalCourt() {
    return {
      page1: new IssueAndSendToLocalCourtCallback1Page(this.page),
      submitPage: new IssueAndSendToLocalCourtCallbackSubmitPage(this.page),
    };
  }

  get c100RemoveLegalRepresentative() {
    return {
      page1: new C100RemoveLegalRepresentative1Page(this.page),
      submitPage: new C100RemoveLegalRepresentativeSubmitPage(this.page),
      confirmPage: new C100RemoveLegalRepresentativeConfirmPage(this.page),
    };
  }

  get fl401RemoveLegalRepresentative() {
    return {
      page1: new Fl401RemoveLegalRepresentative1Page(this.page),
      submitPage: new Fl401RemoveLegalRepresentativeSubmitPage(this.page),
      confirmPage: new Fl401RemoveLegalRepresentativeConfirmPage(this.page),
    };
  }
}
