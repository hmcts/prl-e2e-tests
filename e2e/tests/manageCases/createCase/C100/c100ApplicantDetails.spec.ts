import { test } from "@playwright/test";
import { C100ApplicantDetails } from "../../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails";

test.describe("C100 Create case applicant details tests @manageCases", (): void => {
  test(`Complete the C100 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100ApplicantDetails.C100ApplicantDetails(
      page,
      "solicitor",
      false,
      false,
      true,
      "male",
      true,
    );
  });

  test(`Complete the C100 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the applicant Gender to female.`, async ({ page }): Promise<void> => {
    await C100ApplicantDetails.C100ApplicantDetails(
      page,
      "solicitor",
      false,
      false,
      false,
      "female",
      true,
    );
  });

  test(`Complete the C100 applicant details event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to other. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100ApplicantDetails.C100ApplicantDetails(
      page,
      "solicitor",
      false,
      false,
      false,
      "other",
      true,
    );
  });
});

test(`Accessibility test the C100 applicant details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await C100ApplicantDetails.C100ApplicantDetails(
    page,
    "solicitor",
    true,
    false,
    false,
    "male",
    true,
  );
});
