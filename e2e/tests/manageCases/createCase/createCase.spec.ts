import { test } from "@playwright/test";
import { C100 } from "../../../journeys/manageCases/createCase/C100";
import { FL401 } from "../../../journeys/manageCases/createCase/FL401";

test.describe("Manage cases case solicitor create case tests. @manageCases", (): void => {
  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all hearing urgency questions,
  Saying yes to all applicant details questions with a male applicant @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100.c100(page, "solicitor", false, false, true, true, "male");
  });

  test(`Complete the C100 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all hearing urgency questions,
  Saying no to all applicant details questions with a female applicant @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100.c100(page, "solicitor", false, false, false, false, "female");
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all Respondent details questions,
  Saying yes to all Type of application questions @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401.fl401(page, "solicitor", false, false, true, true);
  });

  test(`Complete the FL401 create case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all Respondent details questions,
  Saying no to all Type of application questions @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401.fl401(page, "solicitor", false, false, false, false);
  });
});
