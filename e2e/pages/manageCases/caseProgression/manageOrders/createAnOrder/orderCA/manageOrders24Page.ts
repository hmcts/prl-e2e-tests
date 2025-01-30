import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";
import { ManageOrders24CAContent } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders24CAContent.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";

interface manageOrders24PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

const radioId = "#amendOrderSelectCheckOptions-managerCheck";

export class ManageOrders24Page {
  public static async manageOrders24Page({
    page,
    accessibilityTest,
  }: manageOrders24PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<manageOrders24PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders24CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Helpers.checkGroup(
      page,
      4,
      ManageOrders24CAContent,
      "label",
      `${Selectors.GovukFormLabel}`,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<manageOrders24PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(radioId);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
