import { EventPage } from "./eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { CheckYourAnswersTableComponent } from "../../components/exui/checkYourAnswersTable.component.js";
import { CommonStaticText } from "../../../common/commonStaticText.js";

type CyaSubmitButton =
  | CommonStaticText.submit
  | CommonStaticText.saveAndContinue;

export class CheckYourAnswersPage extends EventPage {
  private readonly headingH2: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Check your answers",
  });
  private readonly text16: Locator = this.page.locator(Selectors.GovukText16, {
    hasText: "Check the information below carefully.",
  });
  private readonly checkYourAnswersTable: CheckYourAnswersTableComponent =
    new CheckYourAnswersTableComponent(this.page);
  private readonly cyaSubmitButton: string;

  constructor(
    page: Page,
    headingText: string,
    cyaSubmitButton: CyaSubmitButton,
  ) {
    super(page, headingText);
    this.cyaSubmitButton = cyaSubmitButton;
  }

  async assertPageContents(
    snapshotPath: string[],
    snapshotName: string,
  ): Promise<void> {
    console.log("Snapshot path when asserting page contents: " + snapshotPath);
    await this.assertPageHeadings();
    await expect(this.headingH2).toBeVisible();
    await expect(this.text16).toBeVisible();
    snapshotPath.push(snapshotName);
    console.log("Snapshot path after initial snapshot name push: " + snapshotPath);
    await this.checkYourAnswersTable.captureFullTableScreenshot(snapshotPath);
    // not all cya pages have the same "submit" button
    if (this.cyaSubmitButton === CommonStaticText.saveAndContinue) {
      await expect(this.saveAndContinueButton).toBeVisible();
    } else {
      await expect(this.submitButton).toBeVisible();
    }
    await expect(this.previousButton).toBeVisible();
  }
}
