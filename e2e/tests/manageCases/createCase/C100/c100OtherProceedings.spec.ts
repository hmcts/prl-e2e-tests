import { test } from "@playwright/test";
import { C100OtherProceedings } from "../../../../journeys/manageCases/createCase/C100OtherProceedings/C100OtherProceedings";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case other proceedings tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });
  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to previous or ongoing proceedings for the child(ren)?,
  Ongoing Proceedings, @regression`, async ({ page }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100OtherProceedings: "Yes",
      c100OngoingProceedingsAndDocX: true,
    });
  });

  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to previous or ongoing proceedings for the child(ren)?,
  Previous Proceedings, @regression`, async ({ page }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100OtherProceedings: "Yes",
      c100OngoingProceedingsAndDocX: false,
    });
  });

  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying No to previous or ongoing proceedings for the child(ren)?,
   @regression`, async ({ page }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100OtherProceedings: "No",
    });
  });

  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying Don't know to previous or ongoing proceedings for the child(ren)?,
   @regression`, async ({ page }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100OtherProceedings: "Don't know",
    });
  });

  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Yes Error message testing,
  Saying yes to previous or ongoing proceedings for the child(ren)?,
  Ongoing Proceedings, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100OtherProceedings: "Yes",
      c100OngoingProceedingsAndDocX: true,
    });
  });

  test(`C100 other proceedings event as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Saying no to previous or ongoing proceedings for the child(ren)?, @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100OtherProceedings: "No",
    });
  });
});
