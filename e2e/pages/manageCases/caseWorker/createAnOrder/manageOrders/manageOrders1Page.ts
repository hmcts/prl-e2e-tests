import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders1Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/manageOrders/manageOrders1Content";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface manageOrders1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ManageOrders1Page {
  public static async manageOrders1Page({
    page,
    accessibilityTest,
  }: manageOrders1PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<manageOrders1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    // const pageTitle = page.locator(
    //   `${Selectors.GovukHeadingXL}:text-is(${ManageOrders1Content.pageTitle})`,
    // );
    // await pageTitle.waitFor();

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<manageOrders1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }

    await page.click(
      `${Selectors.button}:text-is(${CommonStaticText.continue})`,
    );
  }
}
