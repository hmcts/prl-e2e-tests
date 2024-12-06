import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { StatementOfService1Content } from "../../../../fixtures/manageCases/caseProgression/statementOfService/statementOfService1Content";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { StatementOfServiceSubmitContent } from "../../../../fixtures/manageCases/caseProgression/statementOfService/StatementOfServiceSubmitContent";

interface StatementOfServiceSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class StatementOfServiceSubmitPage {
  public static async statementOfServiceSubmitPage({
    page,
    accessibilityTest,
  }: StatementOfServiceSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<StatementOfServiceSubmitPageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${StatementOfService1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${StatementOfServiceSubmitContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        8,
        StatementOfServiceSubmitContent,
        "text16",
        Selectors.GovukText16,
      ),
      Helpers.checkGroup(
        page,
        3,
        StatementOfServiceSubmitContent,
        "text16Answers",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${StatementOfServiceSubmitContent.a}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${StatementOfServiceSubmitContent.text16Change}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
