import { test } from "@playwright/test";
import { FL401OtherProceedings } from "../../../../journeys/manageCases/createCase/FL401OtherProceedings/FL401OtherProceedings";
import { otherProceedingsRadios } from "../../../../journeys/manageCases/createCase/FL401";

test.describe("FL401 Create case other proceedings tests @manageCases", (): void => {
  test(`Complete the FL401 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes, @crossbrowserManageCases`, async ({ page }): Promise<void> => {
    await FL401OtherProceedings.fl401OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      otherProceedingsRadios: "Yes",
      subJourney: true,
    });
  });

  test(`Complete the FL401 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no, @crossbrowserManageCases`, async ({ page }): Promise<void> => {
    await FL401OtherProceedings.fl401OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      otherProceedingsRadios: "No",
      subJourney: true,
    });
  });

  test(`Complete the FL401 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying don't know, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401OtherProceedings.fl401OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      otherProceedingsRadios: "Don't know",
      subJourney: true,
    });
  });

  test(`Complete the FL401 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes, @crossbrowserManageCases`, async ({ page }): Promise<void> => {
    await FL401OtherProceedings.fl401OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      otherProceedingsRadios: "Yes",
      subJourney: true,
    });
  });
});

test(`Accessibility test the FL401 other proceedings event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes, @accessibilityManageCases`, async ({ page }): Promise<void> => {
  await FL401OtherProceedings.fl401OtherProceedings({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    otherProceedingsRadios: "Yes",
    subJourney: true,
  });
});
