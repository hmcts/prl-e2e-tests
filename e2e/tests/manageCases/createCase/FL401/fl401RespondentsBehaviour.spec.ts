import { test } from "@playwright/test";
import { FL401RespondentsBehaviour } from "../../../../journeys/manageCases/createCase/FL401RespondentsBehaviour/FL401RespondentsBehaviour";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("FL401 Create case respondent’s behaviour tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "FL401",
    });
  });
  test(`Complete the FL401 respondent’s behaviour event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing @regression`, async ({ page }): Promise<void> => {
    await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
      page: page,
      accessibilityTest: false,
    });
  });
});

test(`FL401 respondent’s behaviour event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
    page: page,
    accessibilityTest: true,
  });
});
