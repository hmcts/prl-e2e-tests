import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper.ts";
import { StatementOfTruthContent } from "../../../fixtures/edgeCases/submission/statementOfTruthContent.ts";

interface StatementOfTruthPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  checkBox = "#applicantStatementOfTruth",
}

export class StatementOfTruthPage {
  public static async statementOfTruthPage({
    page,
    accessibilityTest,
  }: StatementOfTruthPageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await page.locator(UniqueSelectors.checkBox).check();
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    const warningLocator = page.locator(
      `${Selectors.GovukWarningText}:text("${StatementOfTruthContent.warning}")`,
    );
    await warningLocator.waitFor();
    await Promise.all([
      expect(
        page
          .locator(Selectors.GovukLabel)
          .filter({ hasText: StatementOfTruthContent.label1 }),
      ).toBeVisible(),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
