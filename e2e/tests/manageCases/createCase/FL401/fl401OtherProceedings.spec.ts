import { test } from "@playwright/test";
import { FL401OtherProceedings } from "../../../../journeys/manageCases/createCase/FL401OtherProceedings/FL401OtherProceedings";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("FL401 Create case other proceedings tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "FL401",
    });
  });
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
    });
  });
});
