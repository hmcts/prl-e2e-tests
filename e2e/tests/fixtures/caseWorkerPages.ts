import { Page } from "@playwright/test";
import { TasksPage } from "../../pageObjects/pages/exui/caseView/tasks.po.ts";
import { SummaryPage } from "../../pageObjects/pages/exui/caseView/summary.po.ts";
import { AmendApplicantDetails1 } from "../../pageObjects/pages/exui/amendApplicantDetails/amendApplicantDetails1.po.ts";
import { AmendApplicantDetailsSubmit } from "../../pageObjects/pages/exui/amendApplicantDetails/amendApplicantDetailsSubmit.po.ts";
import { C100AdminAddBarrister1Page } from "../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminAddBarrister1.po.ts";
import { C100AdminAddBarristerSubmit } from "../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminAddBarristerSubmit.po.ts";
import { PartiesPage } from "../../pageObjects/pages/exui/caseView/parties.po.ts";
import { C100AdminRemoveBarrister1Page } from "../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminRemoveBarrister1Page.po.ts";
import { C100AdminRemoveBarristerSubmit } from "../../pageObjects/pages/exui/addAndRemoveBarrister/c100AdminRemoveBarristerSubmit.po.ts";
import { Fl401AddCaseNumber1Page } from "../../pageObjects/pages/exui/checkApplication/fl401AddCaseNumber1.po.ts";
import { Fl401AddCaseNumberSubmitPage } from "../../pageObjects/pages/exui/checkApplication/fl401AddCaseNumberSubmit.po.ts";
import { AllocatedJudge1Page } from "../../pageObjects/pages/exui/allocatedJudge/allocatedJudge1.po.ts";
import { AllocatedJudgeSubmitPage } from "../../pageObjects/pages/exui/allocatedJudge/allocatedJudgeSubmit.po.ts";
import { RolesAndAccessPage } from "../../pageObjects/pages/exui/caseView/rolesAndAccess.po.ts";
import { DraftOrdersPage } from "../../pageObjects/pages/exui/caseView/draftOrders.po.ts";
import { RemoveDraftOrder1Page } from "../../pageObjects/pages/exui/orders/removeDraftOrder/removeDraftOrder1.po.ts";
import { RemoveDraftOrder2Page } from "../../pageObjects/pages/exui/orders/removeDraftOrder/removeDraftOrder2.po.ts";
import { RemoveDraftOrderSubmitPage } from "../../pageObjects/pages/exui/orders/removeDraftOrder/removeDraftOrderSubmit.po.ts";
import { CreateCaseLink1Page } from "../../pageObjects/pages/exui/caseLinking/createCaseLink1.po.ts";
import { CreateCaseLink2Page } from "../../pageObjects/pages/exui/caseLinking/createCaseLink2.po.ts";
import { CreateCaseLinkSubmitPage } from "../../pageObjects/pages/exui/caseLinking/createCaseLinkSubmit.po.ts";
import { CreateCaseLink3Page } from "../../pageObjects/pages/exui/caseLinking/createCaseLink3.po.ts";
import { MaintainCaseLink1Page } from "../../pageObjects/pages/exui/caseLinking/maintainCaseLink1.po.ts";
import { MaintainCaseLink2Page } from "../../pageObjects/pages/exui/caseLinking/maintainCaseLink2.po.ts";
import { MaintainCaseLink3Page } from "../../pageObjects/pages/exui/caseLinking/maintainCaseLink3.po.ts";
import { MaintainCaseLinkSubmitPage } from "../../pageObjects/pages/exui/caseLinking/maintainCaseLinkSubmit.po.ts";
import { LinkedCasesPage } from "../../pageObjects/pages/exui/caseView/linkedCases.po.ts";

export class CaseWorkerPagesGroup {
  readonly tasksPage: TasksPage;
  readonly summaryPage: SummaryPage;
  readonly amendApplicantDetails1: AmendApplicantDetails1;
  readonly amendApplicantDetailsSubmit: AmendApplicantDetailsSubmit;
  readonly c100AdminAddBarrister1Page: C100AdminAddBarrister1Page;
  readonly c100AdminAddBarristerSubmit: C100AdminAddBarristerSubmit;
  readonly partiesPage: PartiesPage;
  readonly c100AdminRemoveBarrister1Page: C100AdminRemoveBarrister1Page;
  readonly c100AdminRemoveBarristerSubmit: C100AdminRemoveBarristerSubmit;
  readonly fl401AddCaseNumber1Page: Fl401AddCaseNumber1Page;
  readonly fl401AddCaseNumberSubmitPage: Fl401AddCaseNumberSubmitPage;
  readonly allocatedJudge1Page: AllocatedJudge1Page;
  readonly allocatedJudgeSubmitPage: AllocatedJudgeSubmitPage;
  readonly rolesAndAccessPage: RolesAndAccessPage;
  readonly draftOrdersPage: DraftOrdersPage;
  readonly removeDraftOrder1Page: RemoveDraftOrder1Page;
  readonly removeDraftOrder2Page: RemoveDraftOrder2Page;
  readonly removeDraftOrderSubmitPage: RemoveDraftOrderSubmitPage;
  readonly createCaseLink1Page: CreateCaseLink1Page;
  readonly createCaseLink2Page: CreateCaseLink2Page;
  readonly createCaseLinkSubmitPage: CreateCaseLinkSubmitPage;
  readonly createCaseLink3Page: CreateCaseLink3Page;
  readonly maintainCaseLink1Page: MaintainCaseLink1Page;
  readonly maintainCaseLink2Page: MaintainCaseLink2Page;
  readonly maintainCaseLink3Page: MaintainCaseLink3Page;
  readonly maintainCaseLinkSubmitPage: MaintainCaseLinkSubmitPage;
  readonly linkedCasesPage: LinkedCasesPage;

  constructor(public page: Page) {
    this.tasksPage = new TasksPage(page);
    this.summaryPage = new SummaryPage(page);
    this.amendApplicantDetails1 = new AmendApplicantDetails1(page);
    this.amendApplicantDetailsSubmit = new AmendApplicantDetailsSubmit(page);
    this.c100AdminAddBarrister1Page = new C100AdminAddBarrister1Page(page);
    this.c100AdminAddBarristerSubmit = new C100AdminAddBarristerSubmit(page);
    this.partiesPage = new PartiesPage(page);
    this.c100AdminRemoveBarrister1Page = new C100AdminRemoveBarrister1Page(
      page,
    );
    this.c100AdminRemoveBarristerSubmit = new C100AdminRemoveBarristerSubmit(
      page,
    );
    this.fl401AddCaseNumber1Page = new Fl401AddCaseNumber1Page(page);
    this.fl401AddCaseNumberSubmitPage = new Fl401AddCaseNumberSubmitPage(page);
    this.allocatedJudge1Page = new AllocatedJudge1Page(page);
    this.allocatedJudgeSubmitPage = new AllocatedJudgeSubmitPage(page);
    this.rolesAndAccessPage = new RolesAndAccessPage(page);
    this.draftOrdersPage = new DraftOrdersPage(page);
    this.removeDraftOrder1Page = new RemoveDraftOrder1Page(page);
    this.removeDraftOrder2Page = new RemoveDraftOrder2Page(page);
    this.removeDraftOrderSubmitPage = new RemoveDraftOrderSubmitPage(page);
    this.createCaseLink1Page = new CreateCaseLink1Page(page);
    this.createCaseLink2Page = new CreateCaseLink2Page(page);
    this.createCaseLinkSubmitPage = new CreateCaseLinkSubmitPage(page);
    this.createCaseLink3Page = new CreateCaseLink3Page(page);
    this.maintainCaseLink1Page = new MaintainCaseLink1Page(page);
    this.maintainCaseLink2Page = new MaintainCaseLink2Page(page);
    this.maintainCaseLink3Page = new MaintainCaseLink3Page(page);
    this.maintainCaseLinkSubmitPage = new MaintainCaseLinkSubmitPage(page);
    this.linkedCasesPage = new LinkedCasesPage(page);
  }
}
