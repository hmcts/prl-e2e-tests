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

  async captureFullTableScreenshots(screenShotPath: string[]): Promise<void> {
    const table: Locator = this.page.locator(".form-table");
    const boundingBox = await table.boundingBox();

    const viewportHeight = await this.page.evaluate(() => window.innerHeight);
    const totalHeight = boundingBox.height;
    const scrollStep = viewportHeight;
    const scrollStartY = boundingBox.y;
    const scrollEndY = scrollStartY + totalHeight;

    let currentY = scrollStartY;
    let index = 0;

    while (currentY < scrollEndY) {
      await this.page.evaluate((y) => window.scrollTo(0, y), currentY);
      // await this.page.waitForTimeout(200); // Allow time for scroll/render

      const clip = {
        x: 0,
        y: 0, // because it has already scrolled down to the top of the table the screenshot starts at 0
        width: 1920,
        height: Math.min(scrollStep, scrollEndY - currentY),
      };

      const providedScreenshotName: string =
        screenShotPath[screenShotPath.length - 1];
      const screenshotPathCopy: string[] = Array.from(screenShotPath);
      screenshotPathCopy[screenShotPath.length - 1] =
        `${providedScreenshotName}-cya-${index}.png`;
      await expect(this.page).toHaveScreenshot(screenshotPathCopy, {
        clip,
        maxDiffPixelRatio: 0.02,
      });

      currentY += scrollStep;
      index++;
    }
  }
}
