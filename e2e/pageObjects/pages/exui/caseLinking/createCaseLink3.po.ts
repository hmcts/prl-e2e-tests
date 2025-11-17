import { expect, Locator, Page } from "@playwright/test";
import { Base } from "../../base.po.js";
import { Selectors } from "../../../../common/selectors.js";
import { CheckYourAnswersTableComponent } from "../../../components/exui/checkYourAnswersTable.component.js";

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
  private readonly table: CheckYourAnswersTableComponent =
    new CheckYourAnswersTableComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
    await expect(this.sectionHeading).toBeVisible();
    await this.table.runVisualTest(["caseLinking", "create-case-link"], {
      x: 0,
      y: 450,
      width: 1920,
      height: 1080,
    });
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
