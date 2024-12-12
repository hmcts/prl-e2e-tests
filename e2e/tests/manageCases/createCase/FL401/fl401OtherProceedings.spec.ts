import { test } from "@playwright/test";
import Config from "../../../../config";
import { FL401OtherProceedings } from "../../../../journeys/manageCases/createCase/FL401OtherProceedings/FL401OtherProceedings";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case other proceedings tests", (): void => {
  test(`Complete the FL401 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to previous or ongoing family court proceedings involving the applicant and respondent, @regression`, async ({
    page,
  }): Promise<void> => {
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
  Saying no to previous or ongoing family court proceedings involving the applicant and respondent @regression`, async ({
    page,
  }): Promise<void> => {
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
  Saying don't know to previous or ongoing family court proceedings involving the applicant and respondent @regression`, async ({
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
  Saying no to previous or ongoing family court proceedings involving the applicant and respondent, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401OtherProceedings.fl401OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      otherProceedingsRadios: "No",
      subJourney: true,
    });
  });

  test(`Complete the FL401 other proceedings event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying Yes to previous or ongoing family court proceedings involving the applicant and respondent, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401OtherProceedings.fl401OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      otherProceedingsRadios: "Yes",
      subJourney: true,
    });
  });
});

test(`FL401 other proceedings event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to previous or ongoing family court proceedings involving the applicant and respondent, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await FL401OtherProceedings.fl401OtherProceedings({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    otherProceedingsRadios: "Yes",
    subJourney: true,
  });
});
