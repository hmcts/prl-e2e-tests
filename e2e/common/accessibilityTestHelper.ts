import { expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export class AxeTest {
  public static async run(
    page: Page,
    elementsToExclude: string[] = [],
  ): Promise<void> {
    const axeBuilder = new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22a",
      "wcag22aa",
    ]);

    if (elementsToExclude.length > 0) {
      elementsToExclude.forEach((element) => axeBuilder.exclude(element));
    }
    const accessibilityScanResults = await axeBuilder.analyze();
    const violations = accessibilityScanResults.violations;
    if (process.env.PWDEBUG) {
      if (violations.length > 0) {
        console.log(`Accessibility issues found on ${page.url()}:`);
        violations.forEach((violation) => {
          console.log(`${violation.id}: ${violation.description}`);
          console.log(`Impact: ${violation.impact}`);
          console.log(
            `Affected nodes:`,
            violation.nodes.map((node) => node.html).join("\n"),
          );
        });
      }
    }
    expect
      .soft(violations, `Accessibility violations found on ${page.url()}`)
      .toEqual([]);
  }
}
export default AxeTest;
