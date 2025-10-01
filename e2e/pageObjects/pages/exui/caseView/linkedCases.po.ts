import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import {
  CaseLinksTableComponent,
  CaseLinksTableParams,
} from "../../../components/exui/caseLinksTable.component.js";

interface LinkedCasesTablesParams {
  linkedToTableRowParams?: CaseLinksTableParams[];
  linkedFromTableRowParams?: CaseLinksTableParams[];
}

export class LinkedCasesPage extends CaseAccessViewPage {
  private readonly heading: Locator = this.page.locator(Selectors.headingH1, {
    hasText: "Linked cases",
  });
  private readonly linkedToSubHeading: Locator = this.page.locator(
    ".table-sub-heading",
    { hasText: "This case is linked to" },
  );
  private readonly linkedFromSubHeading: Locator = this.page.locator(
    ".table-sub-heading",
    { hasText: "This case is linked from" },
  );
  private readonly linkedToTableLocator: Locator = this.page.locator(
    "ccd-linked-cases-to-table",
  );
  private readonly linkedToTable: CaseLinksTableComponent =
    new CaseLinksTableComponent(this.page, this.linkedToTableLocator);
  private readonly linkedFromTableLocator: Locator = this.page.locator(
    "ccd-linked-cases-from-table",
  );
  private readonly linkedFromTable: CaseLinksTableComponent =
    new CaseLinksTableComponent(this.page, this.linkedFromTableLocator);
  // This link is only present when viewing linked cases from the case that is linked from
  private readonly showHideLink: Locator = this.page.getByRole("link", {
    name: "Show",
  });

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Linked cases" }).click();
  }

  async assertPageContents({
    linkedToTableRowParams,
    linkedFromTableRowParams,
  }: LinkedCasesTablesParams): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.linkedToSubHeading).toBeVisible();
    await expect(this.linkedFromSubHeading).toBeVisible();
    await this.linkedToTable.assertTableContents(linkedToTableRowParams);
    await this.linkedFromTable.assertTableContents(linkedFromTableRowParams);
  }

  async clickShowHideLink(): Promise<void> {
    await this.showHideLink.click();
  }
}
