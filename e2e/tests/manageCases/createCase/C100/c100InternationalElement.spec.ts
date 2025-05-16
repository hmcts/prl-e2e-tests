import { test } from "@playwright/test";
import Config from "../../../../utils/config";
import { C100InternationalElement } from "../../../../journeys/manageCases/createCase/C100InternationalElement/C100InternationalElement";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case International Element Tests", (): void => {
  test(`Complete the C100 International Element as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100InternationalElement.c100InternationalElement({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      yesNoInternationalElement: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case International Element as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options,
  Setting the applicant Gender to male. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100InternationalElement.c100InternationalElement({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      yesNoInternationalElement: false,
      subJourney: true,
    });
  });
});

test(`Complete the C100 Create case International Element as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100InternationalElement.c100InternationalElement({
    page: page,
    user: "solicitor",
    accessibilityTest: true,
    yesNoInternationalElement: true,
    subJourney: true,
  });
});
