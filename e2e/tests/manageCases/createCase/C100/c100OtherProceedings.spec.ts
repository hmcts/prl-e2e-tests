import { test } from "@playwright/test";
import { C100OtherProceedings } from "../../../../journeys/manageCases/createCase/C100OtherProceedings/C100OtherProceedings";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case other proceedings tests @manageCases", (): void => {
  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to previous or ongoing proceedings for the child(ren)?,
  Ongoing Proceedings, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100OtherProceedings: "Yes",
      c100OngoingProceedingsAndDocX: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to previous or ongoing proceedings for the child(ren)?,
  Previous Proceedings, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100OtherProceedings: "Yes",
      c100OngoingProceedingsAndDocX: false,
      subJourney: true,
    });
  });

  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying No to previous or ongoing proceedings for the child(ren)?,
   @crossbrowserManageCases`, async ({ page }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100OtherProceedings: "No",
      subJourney: true,
    });
  });

  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying Don't know to previous or ongoing proceedings for the child(ren)?,
   @crossbrowserManageCases`, async ({ page }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100OtherProceedings: "Don't know",
      subJourney: true,
    });
  });

  test(`Complete the C100 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Yes Error message testing,
  Saying yes to previous or ongoing proceedings for the child(ren)?,
  Ongoing Proceedings, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100OtherProceedings: "Yes",
      c100OngoingProceedingsAndDocX: true,
      subJourney: true,
    });
  });
});

test(`Accessibility test the C100 other proceedings event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying no to previous or ongoing proceedings for the child(ren)?, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await C100OtherProceedings.c100OtherProceedings({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    c100OtherProceedings: "No",
    subJourney: true,
  });
});
