import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { CheckYourAnswersTableComponent } from "../../../components/exui/checkYourAnswersTable.component.js";

export class Fl401AddCaseNumberSubmitPage extends EventPage {
  readonly subHeading: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Check your answers",
  });
  readonly text16: Locator = this.page.locator(Selectors.GovukText16, {
    hasText: "Check the information below carefully.",
  });
  readonly saveAndContinueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.saveAndContinue,
    },
  );
  readonly previousButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.previous,
  });
  readonly checkYourAnswersTableComponent: CheckYourAnswersTableComponent =
    new CheckYourAnswersTableComponent(this.page);

  constructor(page: Page) {
    super(page, "Add case number");
  }

  async checkPageContents(): Promise<void> {
    await this.checkPageHeadings();
    await expect(this.subHeading).toBeVisible();
    await expect(this.text16).toBeVisible();
    await this.checkYourAnswersTableComponent.runVisualTest([
      "caseProgression",
      "checkApplication",
      "check-application.png",
    ]);
    await expect(this.saveAndContinueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }
}
