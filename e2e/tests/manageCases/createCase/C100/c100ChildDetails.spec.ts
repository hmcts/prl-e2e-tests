import { test } from "@playwright/test";
import { C100ChildDetails } from "../../../../journeys/manageCases/createCase/C100ChildDetails/c100ChildDetails";

test.describe("C100 Create case child details tests @manageCases", (): void => {
  test(`Complete the C100 child details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the child Gender to male. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      c100ChildGender: "male",
      errorMessaging: false,
      subJourney: true,
    })
  });

  test(`Complete the C100 child details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the child Gender to female.`, async ({
    page,
  }): Promise<void> => {
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      c100ChildGender: "female",
      errorMessaging: false,
      subJourney: true,
    })
  });

  test(`Complete the C100 child details event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Setting the child Gender to other.`, async ({ page }): Promise<void> => {
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      c100ChildGender: "other",
      errorMessaging: false,
      subJourney: true,
    })
  });
});

test(`Accessibility test the C100 child details event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Setting the child Gender to female. @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await C100ChildDetails.c100ChildDetails({
    page: page,
    user: "solicitor",
    accessibilityTest: true,
    c100ChildGender: "female",
    errorMessaging: false,
    subJourney: true,
  })
});
