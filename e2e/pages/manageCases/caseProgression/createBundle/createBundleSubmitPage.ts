import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CreateBundle1Content } from "../../../../fixtures/manageCases/caseProgression/createBundle/createBundle1Content";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { CreateBundleSubmitContent } from "../../../../fixtures/manageCases/caseProgression/createBundle/createBundleSubmitContent";

interface CreateBundle1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class CreateBundleSubmitPage {
  public static async createBundleSubmitPage({
    page,
    accessibilityTest,
  }: CreateBundle1PageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${CreateBundle1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CreateBundleSubmitContent.creatBundle}")`,
    );
  }
}
