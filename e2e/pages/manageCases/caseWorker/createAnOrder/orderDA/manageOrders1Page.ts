import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { manageOrdersOptions } from "../../../../../common/types.ts";

interface ManageOrders1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  manageOrdersOptions: manageOrdersOptions;
}

enum UniqueSelectors {
  createOrder = "#manageOrdersOptions-createAnOrder",
  uploadOrder = "#manageOrdersOptions-uploadAnOrder",
}

export class ManageOrders1Page {
  public static async manageOrders1Page({
    page,
    accessibilityTest,
    manageOrdersOptions,
  }: ManageOrders1PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, manageOrdersOptions });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Helpers.checkGroup(
      page,
      5,
      ManageOrders1DAContent,
      "formLabel",
      Selectors.GovukFormLabel,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    manageOrdersOptions,
  }: Partial<ManageOrders1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    switch (manageOrdersOptions) {
      case "create order":
        await page.check(UniqueSelectors.createOrder);
        break;
      case "upload order":
        await page.check(UniqueSelectors.uploadOrder);
        break;
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
