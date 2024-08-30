import { test } from "@playwright/test";
import { CaseList } from "../../../journeys/manageCases/caseList/caseList";

test.describe("Manage cases case list tests. @manageCases", (): void => {
  test("Check the case list is visible. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await CaseList.caseList(page, "caseWorker", false);
  });
});

test("Check the case list is accessible @accessibilityManageCases", async ({
  page,
}): Promise<void> => {
  await CaseList.caseList(page, "caseWorker", true);
});
