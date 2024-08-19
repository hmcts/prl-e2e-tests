import { expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export class AxeTest {
  public static async run(page: Page): Promise<void> {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22a",
        "wcag22aa",
      ])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  }
}

export default AxeTest;
