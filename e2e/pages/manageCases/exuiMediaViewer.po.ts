import { Page, expect } from "@playwright/test";

export class ExuiMediaViewerPage {
  private readonly page: Page;

  readonly container;
  readonly toolbar;
  readonly clippingCoords = {
    fullPage: { x: -1000, y: 0, width: 1920, height: 1080 },
  };

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

  public async runVisualTestOnAllPages(): Promise<void> {
    await this.waitForLoad();
    const totalPages = await this.getNumberOfPages();
    for (let i = 0; i < totalPages; i++) {
      await expect(this.page).toHaveScreenshot({
        clip: this.clippingCoords.fullPage,
      });
      if (i !== totalPages - 1) await this.toolbar.pageDownBtn.click();
    }
  }
}
