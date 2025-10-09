import { Fl401AddCaseNumber1Page } from "./pages/exui/checkApplication/fl401AddCaseNumber1.po.js";
import { Fl401AddCaseNumberSubmitPage } from "./pages/exui/checkApplication/fl401AddCaseNumberSubmit.po.js";
import { TasksPage } from "./pages/exui/caseView/tasks.po.js";
import { SummaryPage } from "./pages/exui/caseView/summary.po.js";
import { AllocatedJudge1Page } from "./pages/exui/allocatedJudge/allocatedJudge1.po.js";
import { AllocatedJudgeSubmitPage } from "./pages/exui/allocatedJudge/allocatedJudgeSubmit.po.js";
import { RolesAndAccessPage } from "./pages/exui/caseView/rolesAndAccess.po.js";
import { CreateCaseLink1Page } from "./pages/exui/caseLinking/createCaseLink1.po.js";
import { CreateCaseLink2Page } from "./pages/exui/caseLinking/createCaseLink2.po.js";
import { CreateCaseLink3Page } from "./pages/exui/caseLinking/createCaseLink3.po.js";
import { CreateCaseLinkSubmitPage } from "./pages/exui/caseLinking/createCaseLinkSubmit.po.js";
import { LinkedCasesPage } from "./pages/exui/caseView/linkedCases.po.js";
import { MaintainCaseLink1Page } from "./pages/exui/caseLinking/maintainCaseLink1.po.js";
import { MaintainCaseLink2Page } from "./pages/exui/caseLinking/maintainCaseLink2.po.js";
import { MaintainCaseLink3Page } from "./pages/exui/caseLinking/maintainCaseLink3.po.js";
import { MaintainCaseLinkSubmitPage } from "./pages/exui/caseLinking/maintainCaseLinkSubmit.po.js";
import { C100RemoveLegalRepresentative1Page } from "./pages/exui/removeLegalRepresentation/c100RemoveLegalRepresentative1.po.js";
import { C100RemoveLegalRepresentativeSubmitPage } from "./pages/exui/removeLegalRepresentation/c100RemoveLegalRepresentativeSubmit.po.js";
import { Fl401RemoveLegalRepresentative1Page } from "./pages/exui/removeLegalRepresentation/fl401RemoveLegalRepresentative1.po.js";
import { Fl401RemoveLegalRepresentativeSubmitPage } from "./pages/exui/removeLegalRepresentation/fl401RemoveLegalRepresentativeSubmit.po.js";
import { C100RemoveLegalRepresentativeConfirmPage } from "./pages/exui/removeLegalRepresentation/c100RemoveLegalRepresentativeConfirm.po.js";
import { Fl401RemoveLegalRepresentativeConfirmPage } from "./pages/exui/removeLegalRepresentation/fl401RemoveLegalRepresentativeConfirm.po.js";
import { C100AmendApplicantDetails1ShortPage } from "./pages/exui/addAndRemoveBarrister/c100AmendApplicantDetails1ShortPage.po.ts";
import { PartiesPage } from "./pages/exui/caseView/parties.po.js";
import { ApplicationPage } from "./pages/exui/caseView/application.po.ts";
import { C100Noc1Page } from "./pages/exui/noticeOfChange/c100Noc1Page.po.ts";
import { C100Noc2Page } from "./pages/exui/noticeOfChange/c100Noc2Page.po.ts";
import { C100NocSubmitPage } from "./pages/exui/noticeOfChange/c100NocSubmitPage.po.ts";
import { C100AdminAddBarrister1Page } from "./pages/exui/addAndRemoveBarrister/c100AdminAddBarrister1.po.ts";
import { C100AdminAddBarrister2Page } from "./pages/exui/addAndRemoveBarrister/c100AdminAddBarrister2.po.ts";
import { C100NocConfirmationPage } from "./pages/exui/noticeOfChange/c100NocConfirmationPage.po.ts";
import { C100AdminRemoveBarrister1Page } from "./pages/exui/addAndRemoveBarrister/c100AdminRemoveBarrister1Page.po.ts";
import { C100AdminRemoveBarrister2Page } from "./pages/exui/addAndRemoveBarrister/c100AdminRemoveBarrister2Page.po.ts";

export interface PageFixtures {
  tasksPage: TasksPage;
  summaryPage: SummaryPage;
  rolesAndAccessPage: RolesAndAccessPage;
  linkedCasesPage: LinkedCasesPage;
  partiesPage: PartiesPage;
  applicationPage: ApplicationPage;
  fl401AddCaseNumber1Page: Fl401AddCaseNumber1Page;
  fl401AddCaseNumberSubmitPage: Fl401AddCaseNumberSubmitPage;
  allocatedJudge1Page: AllocatedJudge1Page;
  allocatedJudgeSubmitPage: AllocatedJudgeSubmitPage;
  createCaseLink1Page: CreateCaseLink1Page;
  createCaseLink2Page: CreateCaseLink2Page;
  createCaseLink3Page: CreateCaseLink3Page;
  createCaseLinkSubmitPage: CreateCaseLinkSubmitPage;
  maintainCaseLink1Page: MaintainCaseLink1Page;
  maintainCaseLink2Page: MaintainCaseLink2Page;
  maintainCaseLink3Page: MaintainCaseLink3Page;
  maintainCaseLinkSubmitPage: MaintainCaseLinkSubmitPage;
  c100RemoveLegalRepresentative1Page: C100RemoveLegalRepresentative1Page;
  c100RemoveLegalRepresentativeSubmitPage: C100RemoveLegalRepresentativeSubmitPage;
  c100RemoveLegalRepresentativeConfirmPage: C100RemoveLegalRepresentativeConfirmPage;
  fl401RemoveLegalRepresentative1Page: Fl401RemoveLegalRepresentative1Page;
  fl401RemoveLegalRepresentativeSubmitPage: Fl401RemoveLegalRepresentativeSubmitPage;
  fl401RemoveLegalRepresentativeConfirmPage: Fl401RemoveLegalRepresentativeConfirmPage;
  c100AmendApplicantDetails1ShortPage: C100AmendApplicantDetails1ShortPage;
  c100Noc1Page: C100Noc1Page;
  c100Noc2Page: C100Noc2Page;
  c100NocSubmitPage: C100NocSubmitPage;
  c100AdminAddBarrister1Page: C100AdminAddBarrister1Page;
  c100AdminAddBarrister2Page: C100AdminAddBarrister2Page;
  c100NocConfirmationPage: C100NocConfirmationPage;
  c100AdminRemoveBarrister1Page: C100AdminRemoveBarrister1Page;
  c100AdminRemoveBarrister2Page: C100AdminRemoveBarrister2Page;
}

export const pageFixtures = {
  tasksPage: async ({ page }, use) => {
    await use(new TasksPage(page));
  },
  summaryPage: async ({ page }, use) => {
    await use(new SummaryPage(page));
  },
  rolesAndAccessPage: async ({ page }, use) => {
    await use(new RolesAndAccessPage(page));
  },
  linkedCasesPage: async ({ page }, use) => {
    await use(new LinkedCasesPage(page));
  },
  partiesPage: async ({ page }, use) => {
    await use(new PartiesPage(page));
  },
  applicationPage: async ({ page }, use) => {
    await use(new ApplicationPage(page));
  },
  fl401AddCaseNumber1Page: async ({ page }, use) => {
    await use(new Fl401AddCaseNumber1Page(page));
  },
  fl401AddCaseNumberSubmitPage: async ({ page }, use) => {
    await use(new Fl401AddCaseNumberSubmitPage(page));
  },
  allocatedJudge1Page: async ({ page }, use) => {
    await use(new AllocatedJudge1Page(page));
  },
  allocatedJudgeSubmitPage: async ({ page }, use) => {
    await use(new AllocatedJudgeSubmitPage(page));
  },
  createCaseLink1Page: async ({ page }, use) => {
    await use(new CreateCaseLink1Page(page));
  },
  createCaseLink2Page: async ({ page }, use) => {
    await use(new CreateCaseLink2Page(page));
  },
  createCaseLink3Page: async ({ page }, use) => {
    await use(new CreateCaseLink3Page(page));
  },
  createCaseLinkSubmitPage: async ({ page }, use) => {
    await use(new CreateCaseLinkSubmitPage(page));
  },
  maintainCaseLink1Page: async ({ page }, use) => {
    await use(new MaintainCaseLink1Page(page));
  },
  maintainCaseLink2Page: async ({ page }, use) => {
    await use(new MaintainCaseLink2Page(page));
  },
  maintainCaseLink3Page: async ({ page }, use) => {
    await use(new MaintainCaseLink3Page(page));
  },
  maintainCaseLinkSubmitPage: async ({ page }, use) => {
    await use(new MaintainCaseLinkSubmitPage(page));
  },
  c100RemoveLegalRepresentative1Page: async ({ page }, use) => {
    await use(new C100RemoveLegalRepresentative1Page(page));
  },
  c100RemoveLegalRepresentativeSubmitPage: async ({ page }, use) => {
    await use(new C100RemoveLegalRepresentativeSubmitPage(page));
  },
  c100RemoveLegalRepresentativeConfirmPage: async ({ page }, use) => {
    await use(new C100RemoveLegalRepresentativeConfirmPage(page));
  },
  fl401RemoveLegalRepresentative1Page: async ({ page }, use) => {
    await use(new Fl401RemoveLegalRepresentative1Page(page));
  },
  fl401RemoveLegalRepresentativeSubmitPage: async ({ page }, use) => {
    await use(new Fl401RemoveLegalRepresentativeSubmitPage(page));
  },
  fl401RemoveLegalRepresentativeConfirmPage: async ({ page }, use) => {
    await use(new Fl401RemoveLegalRepresentativeConfirmPage(page));
  },
  c100AmendApplicantDetails1ShortPage: async (use) => {
    await use(new C100AmendApplicantDetails1ShortPage());
  },
  c100Noc1Page: async ({ page }, use) => {
    await use(new C100Noc1Page(page));
  },
  c100Noc2Page: async ({ page }, use) => {
    await use(new C100Noc2Page(page));
  },
  c100NocSubmitPage: async ({ page }, use) => {
    await use(new C100NocSubmitPage(page));
  },
  c100AdminAddBarrister1Page: async ({ page }, use) => {
    await use(new C100AdminAddBarrister1Page(page));
  },
  c100AdminAddBarrister2Page: async ({ page }, use) => {
    await use(new C100AdminAddBarrister2Page(page));
  },
  c100NocConfirmationPage: async ({ page }, use) => {
    await use(new C100NocConfirmationPage(page));
  },
  c100AdminRemoveBarrister1Page: async ({ page }, use) => {
    await use(new C100AdminRemoveBarrister1Page(page));
  },
  c100AdminRemoveBarrister2Page: async ({ page }, use) => {
    await use(new C100AdminRemoveBarrister2Page(page));
  },
};
