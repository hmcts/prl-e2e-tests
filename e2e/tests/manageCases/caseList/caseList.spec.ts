import { test } from "../../fixtures.ts";
import config from "../../../utils/config.utils.js";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("Manage cases case list tests.", (): void => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.manageCasesBaseURLCase);
  });

  //accessibility is failing and nightly execution blocked due to ccd-issue CCD-6819
  test(`Check the case list is visible to the user and user is able to search by case name for specific court.@accessibility @nightly @regression`, async ({
    caseListPage,
    tableUtils,
  }) => {
    await caseListPage.exuiHeader.checkIsVisible();
    await caseListPage.assertPageContents();

    await caseListPage.selectCourt("Swansea", "Swansea");

    const caseName = "test";
    await caseListPage.searchByCaseName(caseName);

    const table = await tableUtils.mapExuiTable(caseListPage.caseListTable);
    await caseListPage.verifyCaseListTableData(table, caseName, "Case");
  });

  [
    { state: "Case Issued" },
    { state: "Submitted" },
    { state: "Pending" },
  ].forEach(({ state }) => {
    test(`Search for cases with state: ${state} @accessibility @regression`, async ({
      caseListPage,
      tableUtils,
    }) => {
      await caseListPage.exuiHeader.checkIsVisible();
      await caseListPage.searchByCaseState(state);
      const table = await tableUtils.mapExuiTable(caseListPage.caseListTable);

      await caseListPage.verifyCaseListTableData(table, state, "State");
    });
  });
});
