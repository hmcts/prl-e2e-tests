import { expect, Locator, Page } from "@playwright/test";

interface ScreenshotParams {
  screenShotPath: string[];
  tableSelector?: string;
  mask?: Locator[];
}

export class CheckYourAnswersTableComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  async captureFullTableScreenshot({
    screenShotPath,
    tableSelector,
    mask = [],
  }: ScreenshotParams): Promise<void> {
    // getByRole returns too many elements so have to use selector
    const defaultCyaTableSelector: string = ".form-table";
    const table: Locator = this.page.locator(
      tableSelector ? tableSelector : defaultCyaTableSelector,
    );
    const providedScreenshotName: string =
      screenShotPath[screenShotPath.length - 1];
    const screenshotPathCopy: string[] = Array.from(screenShotPath);
    screenshotPathCopy[screenShotPath.length - 1] =
      `${providedScreenshotName}-cya.png`;
    await expect(table).toHaveScreenshot(screenshotPathCopy, {
      maxDiffPixelRatio: 0.02,
      mask: mask,
    });
  }
}
