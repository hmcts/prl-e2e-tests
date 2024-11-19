import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SubmitContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/manageOrders/SubmitContent";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface submitPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class SubmitPage {
  public static async submitPage({
    page,
    accessibilityTest,
  }: submitPageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<submitPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    // const pageTitle = page.locator(
    //   `${Selectors.GovukHeadingXL}:text-is(${SubmitContent.pageTitle})`,
    // );
    // await pageTitle.waitFor();

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<submitPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }

    await page.click(
      `${Selectors.button}:text-is(${CommonStaticText.continue})`,
    );
  }
}
