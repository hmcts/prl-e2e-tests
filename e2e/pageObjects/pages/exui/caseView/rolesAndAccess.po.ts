import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";

export class RolesAndAccessPage extends CaseAccessViewPage {
  readonly heading: Locator = this.page.locator(Selectors.GovukHeadingL, {
    hasText: "Roles and access",
  });
  readonly judiciarySection: Locator = this.page.locator(
    "exui-role-access-section",
    { hasText: "Judiciary" },
  );
  readonly dateHelpersUtils: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Roles and access" }).click();
  }

  async assertJudiciaryRolesAndAccess(): Promise<void> {
    const table: Locator = this.judiciarySection.locator(
      "exui-case-roles-table",
    );
    await expect(
      table.getByRole("columnheader", { name: "Name" }),
    ).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: "Role" }),
    ).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: "Start" }),
    ).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: "End" }),
    ).toBeVisible();
    await expect(
      table.getByRole("cell", { name: "Ms Elizabeth Williams" }),
    ).toBeVisible();
    await expect(
      table.getByRole("cell", { name: "Allocated Judge" }),
    ).toBeVisible();
    const date: string | string[] = this.dateHelpersUtils.todayDate(true);
    await expect(
      table.getByRole("cell", { name: date as string }),
    ).toBeVisible();
  }
}
