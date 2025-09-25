import { Base } from "../../base.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { Helpers } from "../../../../common/helpers.js";

// Not a standard event page so don't extend EventPage
export class MaintainCaseLink2Page extends Base {
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
      hasText: "Select the cases you want to unlink from this case",
    },
  );
  private readonly checkBox: Locator = this.page.getByRole("checkbox");
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

  async assertPageContents(
    caseName: string,
    linkedCaseNumber: string,
  ): Promise<void> {
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
    await expect(this.sectionHeading).toBeVisible();
    const label: Locator = this.page.locator(Selectors.GovukLabel, {
      hasText: `${caseName} ${Helpers.getHyphenatedCaseReference(linkedCaseNumber)}`,
    });
    await expect(label).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectCaseToUnlink(): Promise<void> {
    await this.checkBox.check();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
