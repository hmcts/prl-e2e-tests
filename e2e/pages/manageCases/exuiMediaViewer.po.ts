import { expect, Page } from "@playwright/test";

interface ClippingCoords {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const clippingCoords = {
  fullPage: { x: -1000, y: 0, width: 1920, height: 1080 },
  centeredPageWithoutToolbar: { x: 500, y: 300, width: 900, height: 1080 },
};

export class ExuiMediaViewerPage {
  private readonly page: Page;

  readonly container;
  readonly toolbar;

  constructor(page: Page) {
    this.page = page;

    // Initialising locators after page is assigned
    this.container = this.page.locator("exui-media-viewer");
    this.toolbar = {
      container: this.page.locator("#toolbarContainer"),
      numPages: this.page.locator("#numPages"),
      pageDownBtn: this.page.locator("#mvDownBtn"),
      pageUpBtn: this.page.locator("#mvUpBtn"),
    };
  }

  public async waitForLoad(): Promise<void> {
    await expect
      .poll(
        async () => {
          const totalPages = await this.getNumberOfPages();
          return totalPages;
        },
        { timeout: 10_000 },
      )
      .toBeGreaterThan(0);
  }

  public async getNumberOfPages(): Promise<number> {
    const text = await this.toolbar.numPages.textContent();
    if (!text) throw new Error("No page numbers found");
    return parseInt(text.replace("/", ""));
  }

  public async runVisualTestOnAllPages(
    clip: ClippingCoords = clippingCoords.fullPage,
  ): Promise<void> {
    await this.waitForLoad();
    const totalPages = await this.getNumberOfPages();
    for (let i = 0; i < totalPages; i++) {
      await expect(this.page).toHaveScreenshot({
        clip: clip,
        maxDiffPixelRatio: 0.05,
      });
      if (i !== totalPages - 1) await this.toolbar.pageDownBtn.click();
    }
  }
}
