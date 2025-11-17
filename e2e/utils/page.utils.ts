import { expect, Locator, Page } from "@playwright/test";

// Utils class for generic page helper methods
export class PageUtils {
  constructor(private page: Page) {}

  async assertMultipleButtons(
    buttonName: string,
    count: number,
  ): Promise<void> {
    const buttonLocator: Locator = this.page.getByRole("button", {
      name: buttonName,
    });
    await expect(buttonLocator).toHaveCount(count);
  }

  async assertStrings(stringArray: string[], locator?: Locator): Promise<void> {
    for (const string of stringArray) {
      // use locator if more specificity is needed
      if (locator) {
        await expect(locator.getByText(string, { exact: true })).toBeVisible();
      } else {
        await expect(
          this.page.getByText(string, { exact: true }),
        ).toBeVisible();
      }
    }
  }
}
