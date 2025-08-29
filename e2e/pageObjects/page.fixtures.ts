import { Fl401AddCaseNumber1Page } from "./pages/exui/checkApplication/fl401AddCaseNumber1.po.js";
import { Fl401AddCaseNumberSubmitPage } from "./pages/exui/checkApplication/fl401AddCaseNumberSubmit.po.js";
import { AmendApplicantDetails2Page } from "./pages/exui/amendDetails/amendApplicantDetails2Page.po.ts";
import { TasksPage } from "./pages/exui/caseView/tasks.po.js";
import { SummaryPage } from "./pages/exui/caseView/summary.po.js";

export interface PageFixtures {
  tasksPage: TasksPage;
  summaryPage: SummaryPage;
  fl401AddCaseNumber1Page: Fl401AddCaseNumber1Page;
  fl401AddCaseNumberSubmitPage: Fl401AddCaseNumberSubmitPage;
  amendApplicantDetails2Page: AmendApplicantDetails2Page;
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
  amendApplicantDetails2Page: async ({ page }, use) => {
    await use(new AmendApplicantDetails2Page(page));
  },
};
