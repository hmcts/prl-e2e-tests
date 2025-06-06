import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ManageOrders24CAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders24CAContent.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface manageOrders24PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

const radioId = "#amendOrderSelectCheckOptions-noCheck";

export class ManageOrders24PageCA {
  public static async manageOrders24PageCA({
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
    await expect(
      page.locator(Selectors.GovukHeadingL, {
        hasText: ManageOrders24CAContent.pageTitle,
      }),
    ).toBeVisible();
    await Helpers.checkGroup(
      page,
      4,
      ManageOrders24CAContent,
      "label",
      `${Selectors.GovukFormLabel}`,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
