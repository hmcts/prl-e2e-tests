import { test } from "@playwright/test";
import { FL401ApplicantsFamily } from "../../../../journeys/manageCases/createCase/FL401ApplicantsFamily/FL401ApplicantsFamily";

test.describe("FL401 Create case applicants family tests @manageCases", (): void => {
  test(`Complete the FL401 applicants family event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401ApplicantsFamily.fl401ApplicantsFamily({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantHasChildren: true,
      subJourney: true,
    });
  });

  test(`Complete the FL401 applicants family event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,`, async ({
    page
  }): Promise<void> => {
    await FL401ApplicantsFamily.fl401ApplicantsFamily({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      applicantHasChildren: false,
      subJourney: true,
    });
  });

  test(`Complete the FL401 applicants family event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await FL401ApplicantsFamily.fl401ApplicantsFamily({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      applicantHasChildren: true,
      subJourney: true,
    });
  });
});

test(`Accessibility test the FL401 applicants family event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @accessibilityManageCases`, async ({
    page,
  }): Promise<void> => {
  await FL401ApplicantsFamily.fl401ApplicantsFamily({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    applicantHasChildren: true,
    subJourney: true,
  });
});
