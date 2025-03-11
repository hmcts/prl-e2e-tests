import { test } from "@playwright/test";
import { FL401ApplicantDetails } from "../../../../journeys/manageCases/createCase/FL401ApplicantDetails/FL401ApplicantDetails";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("FL401 Create case applicant details tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "FL401",
    });
  });
  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Male applicant @regression`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "male",
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Female applicant @regression`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "female",
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Other gender applicant @regression`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "other",
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Male applicant @regression`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "male",
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Female applicant @regression`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "female",
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Other Gender applicant @regression`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "other",
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying no to all options,
  Male applicant @regression`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "male",
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
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Saying no to all options,
    Male applicant @regression`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: false,
      applicantGender: "male",
    });
  });

  test(`Complete the FL401 applicant details event as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Saying yes to all options,
    Male applicant. @accessibility @nightly`, async ({ page }): Promise<void> => {
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "male",
    });
  });
});