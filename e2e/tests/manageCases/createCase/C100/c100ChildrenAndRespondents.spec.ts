import { test } from "@playwright/test";
import { C100ChildAndRespondents } from "../../../../journeys/manageCases/createCase/C100ChildrenAndRespondents/c100ChildrenAndRespondents";

test.describe("C100 Create case Children and respondents Tests @manageCases", (): void => {
  test(`Complete the C100 Create case Children and respondents as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoChildrenAndRespondents: true,
      subJourney: true,
    });
  });
});
