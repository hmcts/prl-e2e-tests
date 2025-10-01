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
    // if another user is viewing a case then a banner is present so we need to adjust the coordinates to get the same image
    const isSomeoneViewing: boolean = await this.someoneViewing.isVisible();
    const providedScreenshotName: string =
      screenShotPath[screenShotPath.length - 1];
    screenShotPath[screenShotPath.length - 1] = isSomeoneViewing
      ? `someone-viewing-${providedScreenshotName}-cya.png`
      : `${providedScreenshotName}-cya.png`;
    const coords =
      customCoords ??
      (isSomeoneViewing
        ? this.someoneViewingCoords
        : this.cyaTableClippingCoords);
    await expect(this.page).toHaveScreenshot(screenShotPath, {
      clip: coords,
      maxDiffPixelRatio: 0.02,
    });
  }
}
