import { expect, Locator, Page } from "@playwright/test";

export class CheckYourAnswersTableComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  async captureFullTableScreenshot(
    screenShotPath: string[],
    tableSelector?: string,
  ): Promise<void> {
    // getByRole returns too many elements so have to use selector
    const defaultCyaTableSelector: string = ".form-table";
    const table: Locator = this.page.locator(
      tableSelector ? tableSelector : defaultCyaTableSelector,
    );
    console.log("Sceenshot path: " + screenShotPath);
    const providedScreenshotName: string =
      screenShotPath[screenShotPath.length - 1];
    console.log("Provided screenshot name: " + providedScreenshotName);
    const screenshotPathCopy: string[] = Array.from(screenShotPath);
    screenshotPathCopy[screenShotPath.length - 1] =
      `${providedScreenshotName}-cya.png`;
    console.log("Sceenshot path copy: " + screenshotPathCopy);
    await expect(table).toHaveScreenshot(screenshotPathCopy, {
      maxDiffPixelRatio: 0.02,
    });
  }
}
