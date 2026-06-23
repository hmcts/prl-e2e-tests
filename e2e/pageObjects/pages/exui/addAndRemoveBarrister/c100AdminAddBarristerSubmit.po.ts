import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CheckYourAnswersTableComponent } from "../../../components/exui/checkYourAnswersTable.component.ts";

export class C100AdminAddBarristerSubmit extends EventPage {
  private readonly headingH2: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Check your answers",
  });
  private readonly text16: Locator = this.page.locator(Selectors.GovukText16, {
    hasText: "Check the information below carefully.",
  });
  private readonly checkYourAnswersTable: CheckYourAnswersTableComponent =
    new CheckYourAnswersTableComponent(this.page);
  private readonly cyaSubmitButton: string;

  constructor(page: Page) {
    super(page, "Add barrister");
  }

  async assertPageContents(
    snapshotPath: string[],
    snapshotName: string,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.headingH2).toBeVisible();
    await expect(this.text16).toBeVisible();
    const snapshotPathCopy: string[] = Array.from(snapshotPath);
    snapshotPathCopy.push(snapshotName);
    await this.checkYourAnswersTable.captureFullTableScreenshot(
      snapshotPathCopy,
    );
    // not all cya pages have the same "submit" button
    if (this.cyaSubmitButton === CommonStaticText.saveAndContinue) {
      await expect(this.saveAndContinueButton).toBeVisible();
    } else {
      await expect(this.submitButton).toBeVisible();
    }
    await expect(this.previousButton).toBeVisible();
  }
}
