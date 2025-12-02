import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";

type RolesAndAccessSection =
  | "Judiciary"
  | "Legal Ops"
  | "Admin"
  | "CTSC"
  | "Exclusions";

export class RolesAndAccessPage extends CaseAccessViewPage {
  readonly heading: Locator = this.page.locator(Selectors.GovukHeadingL, {
    hasText: "Roles and access",
  });
  readonly judiciarySectionTable: Locator = this.page
    .locator("exui-role-access-section", { hasText: "Judiciary" })
    .getByRole("table");
  readonly legalAdviserSectionTable: Locator = this.page
    .locator("exui-role-access-section", { hasText: "Legal Ops" })
    .getByRole("table");

  readonly dateHelpersUtils: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Roles and access" }).click();
  }

  async assertRolesAndAccessSection(
    section: RolesAndAccessSection,
    name: string,
    role: string,
  ): Promise<void> {
    let sectionTable: Locator;

    // add more cases as required
    switch (section) {
      case "Judiciary":
        sectionTable = this.judiciarySectionTable;
        break;
      case "Legal Ops":
        sectionTable = this.legalAdviserSectionTable;
        break;
      default:
        console.error(`${section} is an invalid section type`);
    }

    await this.assertSection(sectionTable, name, role);
  }

  private async assertSection(
    sectionTable: Locator,
    name: string,
    role: string,
  ): Promise<void> {
    await expect(
      sectionTable.getByRole("columnheader", { name: "Name" }),
    ).toBeVisible();
    await expect(
      sectionTable.getByRole("columnheader", { name: "Role" }),
    ).toBeVisible();
    await expect(
      sectionTable.getByRole("columnheader", { name: "Start" }),
    ).toBeVisible();
    await expect(
      sectionTable.getByRole("columnheader", { name: "End" }),
    ).toBeVisible();
    await expect(sectionTable.getByRole("cell", { name: name })).toBeVisible();
    await expect(sectionTable.getByRole("cell", { name: role })).toBeVisible();
    const date: string | string[] = this.dateHelpersUtils.todayDate(true);
    await expect(
      sectionTable.getByRole("cell", { name: date as string }),
    ).toBeVisible();
  }
}
