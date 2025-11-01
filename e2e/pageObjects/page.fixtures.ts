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
import { PartiesPage } from "./pages/exui/caseView/parties.po.js";
import { AmendApplicantDetails2Page } from "./pages/exui/amendDetails/amendApplicantDetails2.po.ts";
import { AmendApplicantDetails1Page } from "./pages/exui/amendDetails/amendApplicantDetails1.po.ts";
import { AmendApplicantDetailsSubmitPage } from "./pages/exui/amendDetails/amendApplicantDetailsSubmit.po.ts";
import { WithdrawApplicationEvent1Page } from "./pages/exui/withdrawApplication/withdrawApplicationEvent1.po.js";
import { WithdrawApplicationEventSubmitPage } from "./pages/exui/withdrawApplication/withdrawApplicationEventSubmit.po.js";
import { WithdrawApplicationEventConfirmPage } from "./pages/exui/withdrawApplication/withdrawApplicationEventConfirm.po.js";

export interface PageFixtures {
  tasksPage: TasksPage;
  summaryPage: SummaryPage;
  rolesAndAccessPage: RolesAndAccessPage;
  linkedCasesPage: LinkedCasesPage;
  partiesPage: PartiesPage;
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
  amendApplicantDetails1Page: AmendApplicantDetails1Page;
  amendApplicantDetails2Page: AmendApplicantDetails2Page;
  amendApplicantDetailsSubmitPage: AmendApplicantDetailsSubmitPage;
  withdrawApplicationEvent1Page: WithdrawApplicationEvent1Page;
  withdrawApplicationEventSubmitPage: WithdrawApplicationEventSubmitPage;
  withdrawApplicationEventConfirmPage: WithdrawApplicationEventConfirmPage;
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
  amendApplicantDetails1Page: async ({ page }, use) => {
    await use(new AmendApplicantDetails1Page(page));
  },
  amendApplicantDetails2Page: async ({ page }, use) => {
    await use(new AmendApplicantDetails2Page(page));
  },
  amendApplicantDetailsSubmitPage: async ({ page }, use) => {
    await use(new AmendApplicantDetailsSubmitPage(page));
  },
  withdrawApplicationEvent1Page: async ({ page }, use) => {
    await use(new WithdrawApplicationEvent1Page(page));
  },
  withdrawApplicationEventSubmitPage: async ({ page }, use) => {
    await use(new WithdrawApplicationEventSubmitPage(page));
  },
  withdrawApplicationEventConfirmPage: async ({ page }, use) => {
    await use(new WithdrawApplicationEventConfirmPage(page));
  },
};
