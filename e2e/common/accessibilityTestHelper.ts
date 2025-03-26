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
      .disableRules(["aria-allowed-attr"]) //accessibility rule that triggers false-positives (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
      .analyze();
    const violations = accessibilityScanResults.violations;
    if (violations.length !== 0) {
      console.log(`${page.url()}`);
    }
    expect.soft(violations).toEqual([]);
  }
}

export default AxeTest;
