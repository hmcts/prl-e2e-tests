import { expect, Locator, Page } from "@playwright/test";
import { ClippingCoords } from "../../../common/types.js";

export class CheckYourAnswersTableComponent {
  private readonly cyaTableClippingCoords: ClippingCoords = {
    x: 0,
    y: 432,
    width: 1920,
    height: 1080,
  };
  private readonly someoneViewing: Locator =
    this.page.locator(".someoneViewing");
  private readonly someoneViewingCoords: ClippingCoords = {
    x: 0,
    y: 480,
    width: 1920,
    height: 1080,
  };

  constructor(private page: Page) {
    this.page = page;
  }

  async runVisualTest(
    screenShotPath: string[],
    customCoords?: ClippingCoords,
  ): Promise<void> {
    const screenshotName: string = screenShotPath[screenShotPath.length - 1];
    screenShotPath[screenShotPath.length - 1] = `${screenshotName}-cya.png`;
    // if another user is viewing a case then a banner is present so we need to adjust the coordinates to get the same image
    if (await this.someoneViewing.isVisible()) {
      const screenshotName: string = screenShotPath[screenShotPath.length - 1];
      screenShotPath[screenShotPath.length - 1] =
        `someone-viewing-${screenshotName}`;
      await expect(this.page).toHaveScreenshot(screenShotPath, {
        clip: customCoords ?? this.someoneViewingCoords,
        maxDiffPixelRatio: 0.02,
      });
    } else {
      await expect(this.page).toHaveScreenshot(screenShotPath, {
        clip: customCoords ?? this.cyaTableClippingCoords,
        maxDiffPixelRatio: 0.02,
      });
    }
  }
}
