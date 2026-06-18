import { test } from "@playwright/test";
import { FL401ApplicantDetails } from "../../../../journeys/manageCases/createCase/FL401ApplicantDetails/FL401ApplicantDetails.ts";
import Config from "../../../../utils/config.utils.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });
// TEST COMMENT - TO BE REMOVED
test.describe("FL401 Create case applicant details tests", (): void => {
  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying no to all options,
  Male applicant @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "male",
      subJourney: true,
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options,
  Male applicant. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "male",
      subJourney: true,
    });
  });
});

test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Other applicant @regression`, async ({ page }): Promise<void> => {
  await FL401ApplicantDetails.fl401ApplicantDetails({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    yesNoFL401ApplicantDetails: false,
    applicantGender: "other",
    subJourney: true,
  });
});

test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Female applicant. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await FL401ApplicantDetails.fl401ApplicantDetails({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    yesNoFL401ApplicantDetails: true,
    applicantGender: "female",
    subJourney: true,
  });
});
