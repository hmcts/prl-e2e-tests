import { EventPage } from "./eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { CheckYourAnswersTableComponent } from "../../components/exui/checkYourAnswersTable.component.js";
import { ClippingCoords } from "../../../common/types.js";
import { CommonStaticText } from "../../../common/commonStaticText.js";

interface CyaConstructorParams {
  snapshotPath: string[];
  submitButtonText: string;
  customClippingCoords?: ClippingCoords;
}

export class CheckYourAnswersPage extends EventPage {
  private readonly snapshotPath: string[];
  private readonly customClippingCoords: ClippingCoords;
  private readonly headingH2: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Check your answers",
  });
  private readonly text16: Locator = this.page.locator(Selectors.GovukText16, {
    hasText: "Check the information below carefully.",
  });
  private readonly checkYourAnswersTable: CheckYourAnswersTableComponent =
    new CheckYourAnswersTableComponent(this.page);
  private readonly previousButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.previous,
    },
  );
  private readonly submitButton: Locator;

  constructor(
    page: Page,
    headingText: string,
    {
      snapshotPath,
      submitButtonText,
      customClippingCoords,
    }: CyaConstructorParams,
  ) {
    super(page, headingText);
    this.snapshotPath = snapshotPath;
    this.customClippingCoords = customClippingCoords;
    this.submitButton = this.page.locator(Selectors.button, {
      hasText: submitButtonText,
    });
  }

  async assertPageContents(snapshotName: string): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.headingH2).toBeVisible();
    await expect(this.text16).toBeVisible();
    this.snapshotPath.push(snapshotName);
    await this.checkYourAnswersTable.runVisualTest(
      this.snapshotPath,
      this.customClippingCoords,
    );
    await expect(this.submitButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }
}
