import { test } from "@playwright/test";
import { C100ApplicantDetails } from "../../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case - Applicant Details tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });
  test(`Complete the C100 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoApplicantDetails: true,
      applicantGender: "male",
    });
  });

  test(`Complete the C100 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the applicant Gender to female. @nightly @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoApplicantDetails: false,
      applicantGender: "female",
    });
  });

  test(`Complete the C100 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      accessibilityTest: false,
      errorMessaging: true,
      yesNoApplicantDetails: false,
      applicantGender: "male",
    });
  });

  test(`C100 applicant details event as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Saying yes to all options,
    Setting the applicant Gender to female. @smoke @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      accessibilityTest: true,
      errorMessaging: false,
      yesNoApplicantDetails: false,
      applicantGender: "female",
    });
  });
});
