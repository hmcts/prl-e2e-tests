import { Page } from "@playwright/test";
import { Helpers } from "../../../common/helpers";
import { Selectors } from "../../../common/selectors";
import { CaseListContent } from "../../../fixtures/manageCases/caseList/caseListContent";
import { CommonContent } from "../../../fixtures/manageCases/commonContent";
import { CommonPage } from "../commonPage";

export class CaseListPage extends CommonPage {
  public static async casesListPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
  }

  public static async startCreateCaseEvent(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukNavigationLink}:text-is("${CommonContent.createCase}")`,
    );
  }

  private static async waitForCasesToLoad(page: Page): Promise<void> {
    const MAX_RESET_ATTEMPTS = 3;
    const spinner = page.locator(Selectors.xuiSpinner);
    const resetFilters = page.getByTitle("Reset filter");
    const caseHeading = page.locator(
      `${Selectors.headingH2}:text-is("${CaseListContent.yourCasesSubtitle}")`,
    );

    // TODO: Need to replace the implicit waits with something more stable
    // TODO: Need to investigate where cases do not load on first attempt
    for (let i = 0; i < MAX_RESET_ATTEMPTS; i++) {
      if (await spinner.isVisible()) await page.waitForTimeout(10000);
      if (await caseHeading.isVisible()) return;
      await resetFilters.click();
      await page.waitForTimeout(10000);
    }
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.waitForCasesToLoad(page);
    await page.waitForSelector(
      `${Selectors.headingH2}:text-is("${CaseListContent.yourCasesSubtitle}")`,
    );
    await Promise.all([
      CommonPage.checkCommonContent(page),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${CaseListContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CaseListContent.hideFilterButton}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CaseListContent.shareCaseButton}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${CaseListContent.filtersSubtitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        13,
        CaseListContent,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CaseListContent.applyButton}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CaseListContent.resetButton}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:has-text("${CaseListContent.caseListAmount}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ResetLink}:text-is("${CaseListContent.resetLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ColumnLabel}:text-is("${CaseListContent.caseColumnLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ColumnLabel}:text-is("${CaseListContent.familyManColumnLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ColumnLabel}:text-is("${CaseListContent.caseTypeColumnLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ColumnLabel}:text-is("${CaseListContent.stateColumnLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ColumnLabel}:text-is("${CaseListContent.applicantColumnLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ColumnLabel}:text-is("${CaseListContent.respondentColumnLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ColumnLabel}:text-is("${CaseListContent.submittedDateAndTimeColumnLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryText}:text-is("${CaseListContent.unselectableDropdown}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.GovukSummaryText}:has-text("${CaseListContent.unselectableDropdown}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukDetailsText}:has-text("${CaseListContent.dropdownTest}")`,
      1,
    );
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); disabled due to ExUI issues (FPET-1135)
    }
  }
}
