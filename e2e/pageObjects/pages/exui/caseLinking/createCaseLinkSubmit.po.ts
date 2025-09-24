import { Base } from "../../base.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

// Not a standard event page so don't extend EventPage
export class CreateCaseLinkSubmitPage extends Base {
  private readonly pageHeading: Locator = this.page.locator(
    Selectors.GovukHeadingL,
    {
      hasText: "Link cases",
    },
  );
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
    Selectors.headingH2,
    {
      hasText: "Check your answers",
    },
  );
  private readonly content: Locator = this.page.locator(Selectors.GovukText16, {
    hasText: "Check the information below carefully.",
  });
  private readonly createCaseLinkButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: "Create Case Link",
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

  async checkPageContents(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
    await expect(this.sectionHeading).toBeVisible();
    await expect(this.content).toBeVisible();
    await expect(this.createCaseLinkButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async clickCreateCaseLink(): Promise<void> {
    await this.createCaseLinkButton.click();
  }
}
