import { Fl401AddCaseNumber1 } from "./pages/exui/checkApplication/fl401AddCaseNumber1.po.js";
import { Fl401AddCaseNumberSubmit } from "./pages/exui/checkApplication/fl401AddCaseNumberSubmit.po.js";
import { CaseAccessView } from "./pages/exui/caseAccessView.po.js";

export interface PageFixtures {
  caseAccessViewPage: CaseAccessView;
  fl401AddCaseNumber1Page: Fl401AddCaseNumber1;
  fl401AddCaseNumberSubmitPage: Fl401AddCaseNumberSubmit;
}

export const pageFixtures = {
  caseAccessViewPage: async ({ page }, use) => {
    await use(new CaseAccessView(page));
  },
  fl401AddCaseNumber1Page: async ({ page }, use) => {
    await use(new Fl401AddCaseNumber1(page));
  },
  fl401AddCaseNumberSubmitPage: async ({ page }, use) => {
    await use(new Fl401AddCaseNumberSubmit(page));
  },
};
