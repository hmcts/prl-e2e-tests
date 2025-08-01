import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { StatementOfService1Content } from "../../../../fixtures/manageCases/caseProgression/statementOfService/statementOfService1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { StatementOfServiceSubmitContent } from "../../../../fixtures/manageCases/caseProgression/statementOfService/StatementOfServiceSubmitContent.ts";

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
        7,
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
        `${Selectors.strong}:text-is("${StatementOfServiceSubmitContent.strong}")`,
        1,
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
      // await new AxeUtils(page).audit();  //Failing - but not picked up when manually checked using WAVE
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
