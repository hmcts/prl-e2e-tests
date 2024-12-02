import { test } from "@playwright/test";
import { Config } from "../../../config";
import { CaseList } from "../../../journeys/manageCases/caseList/caseList";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Manage cases case list tests.", (): void => {
  test("Check the case list is visible to the user. @regression @smoke", async ({
    page,
  }): Promise<void> => {
    await CaseList.caseList(page, "solicitor", false);
  });
});

test("Check the case list is visible to the user and accessible @accessibility @nightly", async ({
  page,
}): Promise<void> => {
  await CaseList.caseList(page, "solicitor", true);
});
