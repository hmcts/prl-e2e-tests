import { expect, Locator, Page } from "@playwright/test";

export class CheckYourAnswersTableComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  // takes snapshots of the check your answers table as it scrolls down the screen
  async captureFullTableScreenshots(
    screenShotPath: string[],
    tableSelector?: string,
  ): Promise<void> {
    const defaultCyaTableSelector: string = ".form-table";
    const table: Locator = this.page.locator(
      tableSelector ? tableSelector : defaultCyaTableSelector,
    );
    const boundingBox = await table.boundingBox();

    const viewportHeight = await this.page.evaluate(() => window.innerHeight);
    const totalHeight = boundingBox.height;
    const scrollStep = viewportHeight;
    const scrollStartY = boundingBox.y;
    const scrollEndY = scrollStartY + totalHeight;

    let currentY = scrollStartY;
    let index = 0;

    while (currentY < scrollEndY) {
      let clipY: number;
      if (scrollStep > scrollEndY) {
        // if table is smaller than screen
        clipY = scrollStartY;
      } else {
        // only scroll if the able is bigger than the screen
        await this.page.evaluate((y) => window.scrollTo(0, y), currentY);
        clipY = 0; // because it has already scrolled down to the top of the table the screenshot starts at 0
      }

      const clip = {
        x: 0,
        y: clipY,
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
