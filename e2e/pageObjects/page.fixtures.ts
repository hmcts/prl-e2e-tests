import { Fl401AddCaseNumber1Page } from "./pages/exui/checkApplication/fl401AddCaseNumber1.po.js";
import { Fl401AddCaseNumberSubmitPage } from "./pages/exui/checkApplication/fl401AddCaseNumberSubmit.po.js";
import { TasksPage } from "./pages/exui/caseView/tasks.po.js";
import { SummaryPage } from "./pages/exui/caseView/summary.po.js";
import { AllocatedJudge1Page } from "./pages/exui/allocatedJudge/allocatedJudge1.po.js";
import { AllocatedJudgeSubmitPage } from "./pages/exui/allocatedJudge/allocatedJudgeSubmit.po.js";

export interface PageFixtures {
  tasksPage: TasksPage;
  summaryPage: SummaryPage;
  fl401AddCaseNumber1Page: Fl401AddCaseNumber1Page;
  fl401AddCaseNumberSubmitPage: Fl401AddCaseNumberSubmitPage;
  allocatedJudge1Page: AllocatedJudge1Page;
  allocatedJudgeSubmitPage: AllocatedJudgeSubmitPage;
}

export const pageFixtures = {
  tasksPage: async ({ page }, use) => {
    await use(new TasksPage(page));
  },
  summaryPage: async ({ page }, use) => {
    await use(new SummaryPage(page));
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
};
