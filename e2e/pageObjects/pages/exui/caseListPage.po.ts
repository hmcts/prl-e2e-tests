import { Page, expect, Locator } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { Base } from "../base.po.js";

export class CaseListPage extends Base {
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

  readonly caseListColumnLabels: string[] = [
    "Case",
    "Familyman number",
    "Case type",
    "State",
    "Applicant name",
    "Respondent name",
    "Submitted date and time",
    "Case type",
  ];

  readonly caseListFiltersLabels: string[] = [
    "Jurisdiction",
    "Case type",
    "State",
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

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.hideFilterButton).toBeVisible();
    await expect(this.shareCaseButton).toBeVisible();
    await expect(this.filtersHeading).toBeVisible();
    await expect(this.applyButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
    await expect(this.caseListAmount).toBeVisible();
    await expect(this.resetLink).toBeVisible();
    await this.checkStrings(Selectors.ColumnLabel, this.caseListColumnLabels);
    await this.checkStrings(
      Selectors.GovukFormLabel,
      this.caseListFiltersLabels,
    );

    await expect(this.unselectableDropdown).toBeVisible();
    await this.unselectableDropdown.click();
    await expect(this.dropdownTest).toBeVisible();
  }

  async verifyCaseListTableData(
    table: Record<string, string>[],
    columnValue: string,
    columnName: string,
  ): Promise<void> {
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
