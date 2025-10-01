import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { Base } from "../../base.po.js";

// Not a standard event page so don't extend EventPage
export class CreateCaseLink1Page extends Base {
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
      hasText: "Before you start",
    },
  );
  private readonly paragraphs: string[] = [
    "If a group of linked cases has a lead case, you must start from the lead case.",
    "If the cases to be linked has no lead, you can start the linking journey from any of those cases.",
  ];
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
    await expect(this.sectionHeading).toBeVisible();
    await this.checkStrings(Selectors.p, this.paragraphs);
    await expect(this.continueButton).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
