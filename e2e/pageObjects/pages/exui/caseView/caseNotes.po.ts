import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";

export interface CaseNoteDetails {
  subject: string;
  caseNote: string;
  User: string;
}

export class CaseNotesPage extends CaseAccessViewPage {
  private readonly caseNotesTable: Locator = this.page.locator(
    "#case-viewer-field-read--caseNotes",
  );

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Case Notes" }).click();
  }
  async verifyCaseNotes(caseNotes: CaseNoteDetails[]): Promise<void> {
    for (let i = 0; i < caseNotes.length; i++) {
      const caseNote: CaseNoteDetails = caseNotes[i];
      const caseNoteTable: Locator = this.caseNotesTable.getByRole("cell", {
        name: `Case notes ${i + 1}`,
      });
      const caseNotesHeading: Locator = caseNoteTable.getByText(
        `Case notes ${i + 1}`,
      );
      await expect(
        this.page.getByRole("link", { name: "Add case note" }),
      ).toBeVisible();
      await expect(
        this.page.locator("th#case-viewer-field-label"),
      ).toContainText("Case notes");
      await expect(caseNotesHeading).toBeVisible();

      await this.assertTableRow(caseNoteTable, "Subject", caseNote.subject);
      await this.assertTableRow(caseNoteTable, "Case note", caseNote.caseNote);
      await this.assertTableRow(caseNoteTable, "User", caseNote.User);
    }
  }

  private async assertTableRow(
    caseNoteTable: Locator,
    label: string,
    value: string,
  ): Promise<void> {
    const labelLocator: Locator = caseNoteTable
      .getByRole("rowheader", {
        name: label,
        exact: true,
      })
      .first();
    const valueLocator: Locator = caseNoteTable
      .getByRole("cell", {
        name: value,
        exact: true,
      })
      .first();
    await expect(labelLocator).toBeVisible();
    await expect(valueLocator).toBeVisible();
  }
}
