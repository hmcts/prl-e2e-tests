import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders20Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders20content";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface manageOrders20PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ManageOrders20Page {
  public static async manageOrders20Page({
    page,
    accessibilityTest,
  }: manageOrders20PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<manageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    // const pageTitle = page.locator(
    //   `${Selectors.GovukHeadingXL}:text-is(${ManageOrders20Content.pageTitle})`,
    // );
    // await pageTitle.waitFor();

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<manageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }

    await page.click(
      `${Selectors.button}:text-is(${CommonStaticText.continue})`,
    );
  }
}
