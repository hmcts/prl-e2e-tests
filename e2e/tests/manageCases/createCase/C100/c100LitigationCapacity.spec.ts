import { test } from "@playwright/test";
import { C100LitigationCapacity } from "../../../../journeys/manageCases/createCase/C100LitigationCapacity/C100LitigationCapacity";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case Litigation Capacity Tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });
  test(`Complete the C100 Litigation Capacity as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options. @regression`, async ({ page }): Promise<void> => {
    await C100LitigationCapacity.c100LitigationCapacity({
      page: page,
      accessibilityTest: false,
      yesNoLitigationCapacity: true,
    });
  });

  test(`Complete the C100 Create case Litigation Capacity as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options. @regression`, async ({ page }): Promise<void> => {
    await C100LitigationCapacity.c100LitigationCapacity({
      page: page,
      accessibilityTest: false,
      yesNoLitigationCapacity: false,
    });
  });

  test(`Complete the C100 Create case Litigation Capacity as a solicitor with the following options:
    Accessibility testing,
    Not Error message testing,
    Saying yes to all options. @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100LitigationCapacity.c100LitigationCapacity({
      page: page,
      accessibilityTest: true,
      yesNoLitigationCapacity: true,
    });
  });
});