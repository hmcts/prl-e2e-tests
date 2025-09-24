import { expect, Locator, Page } from "@playwright/test";

export interface CaseLinksTableParams {
  caseName: string;
  linkedCaseNumber: string;
  caseType?: string;
  service?: string;
  state: string;
  reasonsForCaseLink: string[];
  otherReason?: string;
}

export class CaseLinksTableComponent {
  private readonly table: Locator;
  private readonly columnHeaders: string[] = [
    "Case name and number",
    "Case type",
    "Service",
    "State",
    "Reasons for case link",
  ];

  constructor(
    private page: Page,
    table: Locator,
  ) {
    this.table = table;
  }

  async assertTableContents(
    caseLinksRowParams?: CaseLinksTableParams[],
  ): Promise<void> {
    await this.assertColumnHeadings();
    if (caseLinksRowParams) {
      for (const caseLinksRow of caseLinksRowParams) {
        const hyphenatedLinkedCaseNumber: string = caseLinksRow.linkedCaseNumber
          .match(/.{1,4}/g)
          .join("-");
        await expect(
          this.table.getByRole("cell", {
            name: `${caseLinksRow.caseName} ${hyphenatedLinkedCaseNumber}`,
          }),
        ).toBeVisible();
        await expect(
          this.table.getByRole("cell", {
            name: caseLinksRow.caseType ?? "C100 & FL401 Applications",
          }),
        ).toBeVisible();
        await expect(
          this.table.getByRole("cell", {
            name: caseLinksRow.service ?? "Family Private Law",
          }),
        ).toBeVisible();
        await expect(
          this.table.getByRole("cell", { name: caseLinksRow.state }),
        ).toBeVisible();
        for (const reason of caseLinksRow.reasonsForCaseLink) {
          if (reason === "Other") {
            const combinedReason = `${reason} - ${caseLinksRow.otherReason}`;
            await expect(
              this.table.getByRole("cell", {
                name: combinedReason,
              }),
            ).toBeVisible();
          } else {
            await expect(
              this.table.getByRole("cell", {
                name: reason,
              }),
            ).toBeVisible();
          }
        }
      }
    } else {
      await expect(
        this.table.getByRole("cell", { name: "None" }),
      ).toBeVisible();
    }
  }

  private async assertColumnHeadings(): Promise<void> {
    for (const columnHeader of this.columnHeaders) {
      await expect(
        this.table.getByRole("columnheader", { name: columnHeader }),
      ).toBeVisible();
    }
  }
}
