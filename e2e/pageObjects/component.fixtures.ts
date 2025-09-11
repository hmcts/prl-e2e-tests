import { CheckYourAnswersTable } from "./components/exui/checkYourAnswersTable.component.ts";

export interface ComponentFixtures {
  checkYourAnswersTable: CheckYourAnswersTable;
}

export const componentFixtures = {
  checkYourAnswersTable: async ({ page }, use) => {
    await use(new CheckYourAnswersTable(page));
  },
};