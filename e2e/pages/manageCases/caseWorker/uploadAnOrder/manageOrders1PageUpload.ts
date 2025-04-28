import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { ManageOrders1CAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders1CAContent";
import { CommonStaticText } from "../../../../common/commonStaticText";

interface manageOrders1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

const radioId = "#manageOrdersOptions-uploadAnOrder";

export class ManageOrders1PageUpload {
  public static async manageOrders1PageUpload({
                                                       page,
                                                       accessibilityTest,
                                                     }: manageOrders1PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoadsUpload({ page, accessibilityTest });
    await this.fillInFieldsUpload({ page });
  }

  private static async checkPageLoadsUpload({
                                              page,
                                              accessibilityTest,
                                            }: Partial<manageOrders1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders1CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Helpers.checkGroup(
      page,
      5,
      ManageOrders1CAContent,
      "label",
      `${Selectors.GovukFormLabel}`,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFieldsUpload({
                                            page,
                                          }: Partial<manageOrders1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(radioId);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}