import { test } from "@playwright/test";
import { C100ApplicantDetails } from "../../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case Applicant Details tests", (): void => {
  test(`Complete the C100 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoApplicantDetails: true,
      applicantGender: "male",
      subJourney: true,
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
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoApplicantDetails: false,
      applicantGender: "female",
      subJourney: true,
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
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      yesNoApplicantDetails: false,
      applicantGender: "male",
      subJourney: true,
    });
  });
});

test(`Test the C100 applicant details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to female. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100ApplicantDetails.C100ApplicantDetails({
    page,
    user: "solicitor",
    accessibilityTest: true,
    errorMessaging: false,
    yesNoApplicantDetails: false,
    applicantGender: "female",
    subJourney: true,
  });
});
