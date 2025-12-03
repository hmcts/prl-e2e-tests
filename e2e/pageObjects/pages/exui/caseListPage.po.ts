import { Page, expect, Locator } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { Base } from "../base.po.js";
import { PageUtils } from "../../../utils/page.utils.js";
import { ExuiSpinnerComponent, TableUtils } from "@hmcts/playwright-common";

export class CaseListPage extends Base {
  private readonly spinnerComponent = new ExuiSpinnerComponent(this.page);
  readonly caseListTable = this.page.locator("#search-result table");
  private readonly caseListHeading: Locator = this.page.locator(Selectors.h1, {
    hasText: "Case list",
  });
  private readonly hideFilterButton: Locator = this.page.locator(
    Selectors.GovukButton,
    {
      hasText: "Hide Filter",
    },
  );
  private readonly shareCaseButton: Locator = this.page.locator(
    Selectors.GovukButton,
    {
      hasText: "Share Case",
    },
  );
  private readonly yourCasesHeading: Locator = this.page.locator(
    Selectors.headingH2,
    {
      hasText: "Your cases",
    },
  );
  private readonly filtersHeading: Locator = this.page.locator(
    Selectors.headingH2,
    {
      hasText: "Filters",
    },
  );
  private readonly applyButton: Locator = this.page.locator(Selectors.button, {
    hasText: "Apply",
  });
  private readonly resetButton: Locator = this.page.locator(Selectors.button, {
    hasText: "Reset",
  });
  private readonly caseListAmount: Locator = this.page.locator(
    Selectors.GovukText16,
    {
      hasText: "Showing 1 to",
    },
  );
  private readonly resetLink: Locator = this.page.locator(Selectors.ResetLink, {
    hasText: "Reset case selection",
  });

  private readonly filters = {
    caseNameFilter: this.page.locator("#applicantCaseName"),
    caseNumberFilter: this.page.locator("#\\[CASE_REFERENCE\\]"),
    caseStateFilter: this.page.locator("select#wb-case-state"),
    dfjAreaFilter: this.page.locator("#dfjArea"),
    courtFilter: this.page.locator("#swanseaDFJCourt"),
  } as const;

  private readonly caseListColumnLabels: string[] = [
    "Case",
    "Familyman number",
    "Case type",
    "State",
    "Applicant name",
    "Respondent name",
    "Submitted date and time",
    "Case type",
  ];

  private readonly caseListFiltersLabels: string[] = [
    "Jurisdiction",
    "Case type",
    "State",
    "DFJ Area",
    "Case name",
    "Familyman number",
    "CCD number",
    "Application type",
    "C100 Child Arrangements Application",
    "FL401 Non-Molestation &/or Occupation Order Application",
    "Date Submitted",
    "Day",
    "Month",
    "Year",
  ];

  private readonly unselectableDropdown: Locator = this.page.locator(
    Selectors.GovukSummaryText,
    {
      hasText: "Why are some cases unselectable?",
    },
  );
  private readonly dropdownTest: Locator = this.page.locator(
    Selectors.GovukDetailsText,
    {
      hasText:
        "You might not be able to select and share some cases in your current case list. However, you'll be able to select any new cases you create and share them.",
    },
  );

  private readonly pageUtils: PageUtils = new PageUtils(this.page);
  private readonly tableUtils: TableUtils = new TableUtils();

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.caseListHeading).toBeVisible();
    await expect(this.hideFilterButton).toBeVisible();
    await expect(this.shareCaseButton).toBeVisible();
    await expect(this.filtersHeading).toBeVisible();
    await expect(this.applyButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
    await expect(this.caseListAmount).toBeVisible();
    await expect(this.resetLink).toBeVisible();
    await this.pageUtils.assertStrings(
      this.caseListColumnLabels,
      this.page.locator(Selectors.ColumnLabel),
    );
    await this.pageUtils.assertStrings(
      this.caseListFiltersLabels,
      this.page.locator(Selectors.GovukFormLabel),
    );
    await expect(this.unselectableDropdown).toBeVisible();
    await this.unselectableDropdown.click();
    await expect(this.dropdownTest).toBeVisible();
  }

  public async searchByCaseName(caseName: string): Promise<void> {
    await this.filters.caseNameFilter.fill(caseName);
    await this.applyButton.click();
    await this.spinnerComponent.wait();
  }

  public async searchByCaseNumber(caseNumber: string): Promise<void> {
    await this.filters.caseNumberFilter.fill(caseNumber);
    await this.applyButton.click();
    await this.spinnerComponent.wait();
  }

  public async searchByCaseState(state: string): Promise<void> {
    await this.filters.caseStateFilter.selectOption(state);
    await this.applyButton.click();
    await this.spinnerComponent.wait();
  }

  public async selectCourt(dfjArea: string, court: string): Promise<void> {
    await this.filters.dfjAreaFilter.selectOption(dfjArea);
    await expect(this.filters.courtFilter).toBeVisible();
    await this.filters.courtFilter.selectOption(court);
  }

  public async searchByCourt(dfjArea: string, court: string): Promise<void> {
    await this.selectCourt(dfjArea, court);
    await this.applyButton.click();
    await this.spinnerComponent.wait();
  }

  public async verifyCaseListTableData(
    columnValue: string,
    columnName: string,
  ): Promise<void> {
    const table = await this.tableUtils.mapExuiTable(this.caseListTable);

    const correctedData = table.map((row) => {
      const keys = Object.keys(row);
      const values = Object.values(row);

      // Detect if first value is empty or looks like a checkbox placeholder
      const firstValue = values[0];
      const isCheckbox = firstValue === "" || firstValue === undefined;

      // If misaligned, shift values to match headers
      const correctedRow: Record<string, string> = {};
      for (let i = 0; i < keys.length; i++) {
        correctedRow[keys[i]] = values[isCheckbox ? i + 1 : i];
      }
      return correctedRow;
    });

    correctedData.forEach((row) => {
      expect((row[columnName] || "").toLowerCase()).toContain(
        columnValue.toLowerCase(),
      );
    });
  }
}
