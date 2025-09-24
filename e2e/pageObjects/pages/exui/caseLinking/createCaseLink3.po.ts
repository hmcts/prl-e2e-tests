import { expect, Locator, Page } from "@playwright/test";
import { Base } from "../../base.po.js";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { CaseLinksTableParams } from "../../../components/exui/caseLinksTable.component.js";

// Not a standard event page so don't extend EventPage
export class CreateCaseLink3Page extends Base {
  private readonly familyManHeading: Locator = this.page.locator(Selectors.h2, {
    hasText: "FamilyMan ID",
  });
  private readonly caseNumberHeading: Locator = this.page.locator(
    Selectors.h2,
    {
      hasText: "Casenumber",
    },
  );
  private readonly sectionHeading: Locator = this.page.locator(
    Selectors.GovukHeadingXL,
    {
      hasText: "Check your answers",
    },
  );
  // Can't use CaseLinksTableComponent here because it isn't a standard Case Links Table
  private readonly table: Locator = this.page.locator("#linked-cases-table");
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly previousButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.previous,
    },
  );

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents({
    caseName,
    linkedCaseNumber,
    reasonsForCaseLink,
    otherReason,
  }: Partial<CaseLinksTableParams>): Promise<void> {
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
    await expect(this.sectionHeading).toBeVisible();
    await this.assertTableContents({
      caseName,
      linkedCaseNumber,
      reasonsForCaseLink,
      otherReason,
    });
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  private async assertTableContents({
    caseName,
    linkedCaseNumber,
    reasonsForCaseLink,
    otherReason,
  }: Partial<CaseLinksTableParams>): Promise<void> {
    await expect(
      this.table.locator(Selectors.GovukTableCaption, {
        hasText: "Proposed case links",
      }),
    ).toBeVisible();
    await expect(
      this.table.getByRole("columnheader", { name: "Case name and number" }),
    ).toBeVisible();
    await expect(
      this.table.getByRole("columnheader", { name: "Reasons for case link" }),
    ).toBeVisible();
    const hyphenatedLinkedCaseNumber: string = linkedCaseNumber
      .match(/.{1,4}/g)
      .join("-");
    await expect(
      this.table.getByRole("cell", {
        name: `${caseName} ${hyphenatedLinkedCaseNumber}`,
      }),
    ).toBeVisible();
    let reasonForCaseLink: string = "";
    for (const reason of reasonsForCaseLink) {
      if (reason === "Other") {
        const combinedReason = `${reason} - ${otherReason}`;
        reasonForCaseLink += `${combinedReason} `;
      } else {
        reasonForCaseLink += `${reason} `;
      }
    }
    await expect(
      this.table.getByRole("cell", { name: reasonForCaseLink }),
    ).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
