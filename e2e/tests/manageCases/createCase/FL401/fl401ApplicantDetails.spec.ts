import { test } from "@playwright/test";
import { FL401ApplicantDetails } from "../../../../journeys/manageCases/createCase/FL401ApplicantDetails/FL401ApplicantDetails";

test.describe("FL401 Create case applicant details tests @manageCases", (): void => {
  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Male applicant @crossbrowserManageCases`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "male",
      subJourney: true,
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Female applicant`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "female",
      subJourney: true,
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Other gender applicant`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "other",
      subJourney: true,
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Male applicant @crossbrowserManageCases`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "male",
      subJourney: true,
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Female applicant`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "female",
      subJourney: true,
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Other Gender applicant`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "other",
      subJourney: true,
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying no to all options,
  Male applicant @crossbrowserManageCases`, async ({ page }): Promise<void> => {
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
  Male applicant`, async ({ page }): Promise<void> => {
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
  Male applicant @crossbrowserManageCases`, async ({ page }): Promise<void> => {
  await FL401ApplicantDetails.fl401ApplicantDetails({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    yesNoFL401ApplicantDetails: false,
    applicantGender: "male",
    subJourney: true,
  });
});

test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Male applicant`, async ({ page }): Promise<void> => {
  await FL401ApplicantDetails.fl401ApplicantDetails({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    yesNoFL401ApplicantDetails: true,
    applicantGender: "male",
    subJourney: true,
  });
});
