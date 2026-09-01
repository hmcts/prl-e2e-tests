import { EventPage } from "./eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { CheckYourAnswersTableComponent } from "../../components/exui/checkYourAnswersTable.component.js";
import { CommonStaticText } from "../../../common/commonStaticText.js";

type CyaSubmitButton =
  | CommonStaticText.submit
  | CommonStaticText.saveAndContinue
  | "Delete"
  | "Mark case as restricted";

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

  async assertPageContents(): Promise<void>;
  async assertPageContents(
    snapshotPath: string[],
    snapshotName: string,
  ): Promise<void>;
  async assertPageContents(
    snapshotPath?: string[],
    snapshotName?: string,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.headingH2).toBeVisible();
    await expect(this.text16).toBeVisible();
    if (snapshotPath && snapshotName) {
      const snapshotPathCopy: string[] = Array.from(snapshotPath);
      snapshotPathCopy.push(snapshotName);
      await this.checkYourAnswersTable.captureFullTableScreenshot(
        snapshotPathCopy,
      );
    }
    // not all cya pages have the same "submit" button
    switch (this.cyaSubmitButton) {
      case CommonStaticText.saveAndContinue:
        await expect(this.saveAndContinueButton).toBeVisible();
        break;
      case CommonStaticText.submit:
        await expect(this.submitButton).toBeVisible();
        break;
      case "Delete":
        await expect(this.deleteButton).toBeVisible();
        break;
      case "Mark case as restricted":
        await expect(this.markCaseAsRestrictedButton).toBeVisible();
        break;
      default:
        throw new Error(
          `Unexpected value for check your answers submit button: ${this.cyaSubmitButton}`,
        );
    }
    await expect(this.previousButton).toBeVisible();
  }
}
