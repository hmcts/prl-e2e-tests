import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ManageOrders1CAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders1CAContent.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

interface manageOrders1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  isUploadOrder: boolean;
}

const radioId = "#manageOrdersOptions-createAnOrder";
const radioId2 = "#manageOrdersOptions-uploadAnOrder";

export class ManageOrders1Page {
  public static async manageOrders1Page({
    page,
    accessibilityTest,
    isUploadOrder,
  }: manageOrders1PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, isUploadOrder });
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
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    isUploadOrder,
  }: Partial<manageOrders1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    if (isUploadOrder === true) {
      await page.click(radioId2);
    } else {
      await page.click(radioId);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
