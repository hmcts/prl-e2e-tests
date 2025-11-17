import { EventPage } from "./eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { CheckYourAnswersTableComponent } from "../../components/exui/checkYourAnswersTable.component.js";
import { ClippingCoords } from "../../../common/types.js";
import { CommonStaticText } from "../../../common/commonStaticText.js";

type CyaSubmitButton =
  | CommonStaticText.submit
  | CommonStaticText.saveAndContinue;

interface CyaConstructorParams {
  snapshotPath: string[];
  cyaSubmitButton: CyaSubmitButton;
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
  private readonly cyaSubmitButton: string;

  constructor(
    page: Page,
    headingText: string,
    {
      snapshotPath,
      cyaSubmitButton,
      customClippingCoords,
    }: CyaConstructorParams,
  ) {
    super(page, headingText);
    this.snapshotPath = snapshotPath;
    this.customClippingCoords = customClippingCoords;
    this.cyaSubmitButton = cyaSubmitButton;
  }

  async assertPageContents(snapshotName: string): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.headingH2).toBeVisible();
    await expect(this.text16).toBeVisible();
    this.snapshotPath.push(snapshotName);
    await this.checkYourAnswersTable.captureFullTableScreenshots(
      this.snapshotPath,
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
