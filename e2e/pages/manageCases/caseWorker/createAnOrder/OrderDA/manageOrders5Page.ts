import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface ManageOrders5PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {}

export class ManageOrders5Page {
  public static async manageOrders5Page({
    page,
    accessibilityTest,
  }: ManageOrders5PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
