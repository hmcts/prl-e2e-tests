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
  get rolesAndAccessPage() {
    return new RolesAndAccessPage(this.page);
  }
  get draftOrdersPage() {
    return new DraftOrdersPage(this.page);
  }
  get linkedCasesPage() {
    return new LinkedCasesPage(this.page);
  }
  get fl401AddCaseNumber1Page() {
    return new Fl401AddCaseNumber1Page(this.page);
  }
  get fl401AddCaseNumberSubmitPage() {
    return new Fl401AddCaseNumberSubmitPage(this.page);
  }
  get allocatedJudge1Page() {
    return new AllocatedJudge1Page(this.page);
  }
  get allocatedJudgeSubmitPage() {
    return new AllocatedJudgeSubmitPage(this.page);
  }

  get manageBarristerC100() {
    return {
      addBarrister1Page: new C100AdminAddBarrister1Page(this.page),
      addBarristerSubmit: new C100AdminAddBarristerSubmit(this.page),
      removeBarrister1Page: new C100AdminRemoveBarrister1Page(this.page),
      removeBarristerSubmit: new C100AdminRemoveBarristerSubmit(this.page),
    };
  }

  get manageCaseLinks() {
    return {
      createCaseLink1Page: new CreateCaseLink1Page(this.page),
      createCaseLink2Page: new CreateCaseLink2Page(this.page),
      createCaseLink3Page: new CreateCaseLink3Page(this.page),
      createCaseLinkSubmitPage: new CreateCaseLinkSubmitPage(this.page),
      maintainCaseLink1Page: new MaintainCaseLink1Page(this.page),
      maintainCaseLink2Page: new MaintainCaseLink2Page(this.page),
      maintainCaseLink3Page: new MaintainCaseLink3Page(this.page),
      maintainCaseLinkSubmitPage: new MaintainCaseLinkSubmitPage(this.page),
    };
  }

  get removeDraftOrders() {
    return {
      page1: new RemoveDraftOrder1Page(this.page),
      page2: new RemoveDraftOrder2Page(this.page),
      submitPage: new RemoveDraftOrderSubmitPage(this.page),
    };
  }

  get amendDetails() {
    return {
      amendApplicantDetails1: new AmendApplicantDetails1(this.page),
      amendApplicantDetailsSubmit: new AmendApplicantDetailsSubmit(this.page),
    };
  }
}
