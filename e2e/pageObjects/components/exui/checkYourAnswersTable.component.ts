import { expect, Locator, Page } from "@playwright/test";
import { ClippingCoords } from "../../../common/types.js";

export class CheckYourAnswersTableComponent {
  private readonly cyaTableClippingCoords: ClippingCoords = {
    x: 0,
    y: 432,
    width: 1920,
    height: 1080,
  };

  constructor(private page: Page) {
    this.page = page;
  }

  async runVisualTest(
    screenShotName: string,
    mask: Locator[] = [],
  ): Promise<void> {
    if (mask) {
      await expect(this.page).toHaveScreenshot(`${screenShotName}.png`, {
        clip: this.cyaTableClippingCoords,
        maxDiffPixelRatio: 0.02,
        mask: mask,
      });
    } else {
      await expect(this.page).toHaveScreenshot(`${screenShotName}.png`, {
        clip: this.cyaTableClippingCoords,
        maxDiffPixelRatio: 0.02,
      });
    }
  }
}
