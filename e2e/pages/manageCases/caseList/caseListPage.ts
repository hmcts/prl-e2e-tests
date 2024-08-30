import { CommonPage } from "../commonPage";
import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { CaseListContent } from "../../../fixtures/manageCases/caseList/caseListContent";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";
import { Helpers } from "../../../common/helpers";

export class CaseListPage extends CommonPage {
  public static async casesListPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
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
      ...Array.from({ length: 13 }, (_, index) => {
        const formLabel = (CaseListContent as any)[`formLabel${index + 1}`];
        return Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${formLabel}")`,
          1,
        );
      }),
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
      await AccessibilityTestHelper.run(page);
    }
  }
}
