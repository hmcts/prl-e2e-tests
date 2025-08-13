import { Fl401AddCaseNumber1 } from "./pages/exui/checkApplication/fl401AddCaseNumber1.po.js";
import { Fl401AddCaseNumberSubmit } from "./pages/exui/checkApplication/fl401AddCaseNumberSubmit.po.js";
import { TasksPage } from "./pages/exui/caseView/tasks.po.js";
import { SummaryPage } from "./pages/exui/caseView/summary.po.js";

export interface PageFixtures {
  tasksPage: TasksPage;
  summaryPage: SummaryPage;
  fl401AddCaseNumber1Page: Fl401AddCaseNumber1;
  fl401AddCaseNumberSubmitPage: Fl401AddCaseNumberSubmit;
}

export const pageFixtures = {
  tasksPage: async ({ page }, use) => {
    await use(new TasksPage(page));
  },
  summaryPage: async ({ page }, use) => {
    await use(new SummaryPage(page));
  },
  fl401AddCaseNumber1Page: async ({ page }, use) => {
    await use(new Fl401AddCaseNumber1(page));
  },
  fl401AddCaseNumberSubmitPage: async ({ page }, use) => {
    await use(new Fl401AddCaseNumberSubmit(page));
  },
};
