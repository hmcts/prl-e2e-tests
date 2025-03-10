import { test } from "@playwright/test";
import { C100InternationalElement } from "../../../../journeys/manageCases/createCase/C100InternationalElement/C100InternationalElement";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case International Element Tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });
  test(`Complete the C100 International Element as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100InternationalElement.c100InternationalElement({
      page: page,
      accessibilityTest: false,
      yesNoInternationalElement: true,
    });
  });

  test(`Complete the C100 Create case International Element as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the applicant Gender to male. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100InternationalElement.c100InternationalElement({
      page: page,
      accessibilityTest: false,
      yesNoInternationalElement: false,
    });
  });
});

test(`Complete the C100 Create case International Element as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100InternationalElement.c100InternationalElement({
    page: page,
    accessibilityTest: true,
    yesNoInternationalElement: true,
  });
});
