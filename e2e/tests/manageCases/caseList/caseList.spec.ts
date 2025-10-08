import { test } from "../../fixtures.ts";
import config from "../../../utils/config.utils.js";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("Manage cases case list tests.", (): void => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.manageCasesBaseURLCase);
  });

  //accessibility is failing and nightly execution blocked due to ccd-issue CCD-6819
  // TODO: bug ticket to fix issue causing test to fail l
  test(`Check the case list is visible to the user and user is able to search by case name.@accessibility @regression`, async ({
    caseListPage,
    tableUtils,
    axeUtils,
  }) => {
    await caseListPage.exuiHeader.checkIsVisible();
    await caseListPage.assertPageContents();

    const caseName = "test";
    await caseListPage.exuiCaseListComponent.searchByCaseName(caseName);

    const table = await tableUtils.mapExuiTable(
      caseListPage.exuiCaseListComponent.caseListTable,
    );

    await caseListPage.verifyCaseListTableData(table, caseName, "Case");
    await axeUtils.audit();
  });

  // this test is intermittently failing due to application behaviour, CCD-6819

  [
    { state: "Case Issued" },
    //{ state: "Submitted" },
    //{ state: "Pending" },
  ].forEach(({ state }) => {
    test.fixme(
      `Search for cases with state: ${state}`,
      async ({ caseListPage, tableUtils }) => {
        await caseListPage.exuiHeader.checkIsVisible();
        await caseListPage.exuiCaseListComponent.searchByCaseState(state);
        const table = await tableUtils.mapExuiTable(
          caseListPage.exuiCaseListComponent.caseListTable,
        );

        await caseListPage.verifyCaseListTableData(table, state, "State");
      },
    );
  });
});
