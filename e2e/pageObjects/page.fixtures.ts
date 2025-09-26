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

export interface PageFixtures {
  tasksPage: TasksPage;
  summaryPage: SummaryPage;
  rolesAndAccessPage: RolesAndAccessPage;
  linkedCasesPage: LinkedCasesPage;
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
};
