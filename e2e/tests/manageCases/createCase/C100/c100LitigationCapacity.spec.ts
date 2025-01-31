import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100LitigationCapacity } from "../../../../journeys/manageCases/createCase/C100LitigationCapacity/C100LitigationCapacity";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case as a solicitor - Litigation Capacity Tests", (): void => {
  test(`Complete the C100 Litigation Capacity as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options. @regression`, async ({ page }): Promise<void> => {
    await C100LitigationCapacity.c100LitigationCapacity({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      yesNoLitigationCapacity: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case Litigation Capacity as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options. @regression`, async ({ page }): Promise<void> => {
    await C100LitigationCapacity.c100LitigationCapacity({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      yesNoLitigationCapacity: false,
      subJourney: true,
    });
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
    user: "solicitor",
    accessibilityTest: true,
    yesNoLitigationCapacity: true,
    subJourney: true,
  });
});
