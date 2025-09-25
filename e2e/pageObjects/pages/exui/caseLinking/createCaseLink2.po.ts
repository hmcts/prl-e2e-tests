import { Base } from "../../base.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import {
  CaseLinksTableComponent,
  CaseLinksTableParams,
} from "../../../components/exui/caseLinksTable.component.js";

// Not a standard event page so don't extend EventPage
export class CreateCaseLink2Page extends Base {
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
      hasText: "Select a case you want to link to this case",
    },
  );
  private readonly subHeadings: string[] = [
    "Enter case reference",
    "Why should these cases be linked?",
  ];
  private readonly caseNumberInput: Locator = this.page
    .locator("#caseNumber")
    .getByRole("textbox");
  private readonly hint: Locator = this.page.locator(Selectors.GovukHint, {
    hasText: "Select all that apply.",
  });
  private readonly caseLinkReasons: string[] = [
    "Bail",
    "Case consolidated",
    "Common circumstance",
    "Familial",
    "Findings of fact",
    "First Tier Agency (FTA) Request",
    "Guardian",
    "Linked for a hearing",
    "Point of law",
    " Progressed as part of this lead case",
    "Referred to the same judge",
    "Related appeal",
    "Related proceedings",
    "Same Party",
    "Same child/ren",
    "Shared evidence",
    "Other",
  ];
  private readonly tableHeading: Locator = this.page.locator(
    Selectors.GovukTableCaption,
    {
      hasText: "Proposed case links",
    },
  );
  private readonly proposeCaseLinkButton: Locator =
    this.page.locator("#propose");
  private readonly proposedCaseLinksTableLocator: Locator = this.page.locator(
    Selectors.GovukTable,
  );
  private readonly proposedCaseLinksTable: CaseLinksTableComponent =
    new CaseLinksTableComponent(this.page, this.proposedCaseLinksTableLocator);

  // add other checkboxes if required
  private readonly caseConsolidatedCheckbox: Locator = this.page.getByRole(
    "checkbox",
    {
      name: "Case consolidated",
    },
  );
  private readonly otherCheckbox: Locator = this.page.getByRole("checkbox", {
    name: "Other",
  });
  private readonly otherComments: Locator = this.page.locator(
    Selectors.GovukHeadingS,
    {
      hasText: "Comments",
    },
  );
  private readonly otherDescriptionInput: Locator =
    this.page.locator("#otherDescription");
  private readonly otherCommentsHint: Locator = this.page.locator(
    "#other-description-char-limit-info",
    { hasText: "You can enter up to 100 characters" },
  );
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

  async assertPageContents(): Promise<void> {
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
    await expect(this.sectionHeading).toBeVisible();
    await this.checkStrings(Selectors.GovukHeadingS, this.subHeadings);
    await expect(this.hint).toBeVisible();
    await this.checkStrings(Selectors.GovukLabel, this.caseLinkReasons);
    await expect(this.proposeCaseLinkButton).toBeVisible();
    await this.proposedCaseLinksTable.assertTableContents();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async proposeCaseLink({
    linkedCaseNumber,
    reasonsForCaseLink,
    otherReason,
  }: Partial<CaseLinksTableParams>): Promise<void> {
    await this.caseNumberInput.fill(linkedCaseNumber);
    for (const checkboxName of reasonsForCaseLink) {
      const checkbox: Locator = this.page.getByRole("checkbox", {
        name: checkboxName,
      });
      await checkbox.check();
    }
    await this.caseConsolidatedCheckbox.check();
    await this.otherCheckbox.check();
    await expect(this.otherComments).toBeVisible();
    await expect(this.otherCommentsHint).toBeVisible();
    await this.otherDescriptionInput.fill(otherReason);
    await this.proposeCaseLinkButton.click();
  }

  async assertProposedCaseLinksTableContents({
    caseName,
    linkedCaseNumber,
    state,
    reasonsForCaseLink,
    otherReason,
  }: CaseLinksTableParams): Promise<void> {
    await expect(this.tableHeading).toBeVisible();
    await this.proposedCaseLinksTable.assertTableContents([
      {
        caseName,
        linkedCaseNumber,
        state,
        reasonsForCaseLink,
        otherReason,
      },
    ]);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
