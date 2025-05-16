import { test } from "@playwright/test";
import Config from "../../../../utils/config";
import { FL401ApplicantsFamily } from "../../../../journeys/manageCases/createCase/FL401ApplicantsFamily/FL401ApplicantsFamily";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case applicants family tests", (): void => {
  test(`Complete the FL401 applicants family event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @regression`, async ({ page }): Promise<void> => {
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
  Saying no to all options @regression,`, async ({ page }): Promise<void> => {
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
  Saying yes to all options, @regression @errorMessage`, async ({
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

test(`FL401 applicants family event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @accessibility @nightly`, async ({
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
