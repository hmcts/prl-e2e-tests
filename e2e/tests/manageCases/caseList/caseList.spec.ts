import { test } from "@playwright/test";
import Config from "../../../config";
import { CaseList } from "../../../journeys/manageCases/caseList/caseList";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Manage cases case list tests. @manageCases", (): void => {
  test("Check the case list is visible to the user. @crossbrowserManageCases @manageCasesSmoke", async ({
    page,
  }): Promise<void> => {
    await CaseList.caseList(page, "solicitor", false);
  });
});

test("Check the case list is accessible @accessibilityManageCases", async ({
  page,
}): Promise<void> => {
  await CaseList.caseList(page, "solicitor", true);
});
