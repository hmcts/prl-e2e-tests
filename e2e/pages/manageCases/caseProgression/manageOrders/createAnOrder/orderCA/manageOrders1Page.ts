import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";
import { ManageOrders1CAContent } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders1CAContent.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";

interface manageOrders1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

const radioId = "#manageOrdersOptions-createAnOrder";

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

  private static async fillInFields({
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
