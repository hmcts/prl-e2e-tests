import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ManageOrders8CAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders8CAContent.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface manageOrders8PageOptions {
  page: Page;
  accessibilityTest: boolean;
  isCaseworker: boolean;
}

enum checkBoxIds {
  childArrangementsOrdersToIssue_childArrangementsOrder = "#childArrangementsOrdersToIssue-childArrangementsOrder",
  childArrangementsOrdersToIssue_prohibitedStepsOrder = "#childArrangementsOrdersToIssue-prohibitedStepsOrder",
  childArrangementsOrdersToIssue_specificIssueOrder = "#childArrangementsOrdersToIssue-specificIssueOrder",
}

const radioId = "#selectChildArrangementsOrder-spendTimeWithOrder";

export class ManageOrders8PageCA {
  public static async manageOrders8PageCA({
    page,
    accessibilityTest,
    isCaseworker,
  }: manageOrders8PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest, isCaseworker });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    isCaseworker,
  }: Partial<manageOrders8PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    if (isCaseworker) {
      await expect(
        page.locator(
          `${Selectors.GovukHeadingL}:text-is("${ManageOrders8CAContent.pageTitle}")`,
        ),
      ).toBeVisible();
    } else {
      await expect(
        page.locator(
          `${Selectors.GovukHeadingL}:text-is("${ManageOrders8CAContent.pageTitle2}")`,
        ),
      ).toBeVisible();
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders8CAContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ManageOrders8CAContent,
        "label",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
  }: Partial<manageOrders8PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    for (const selector of Object.values(checkBoxIds)) {
      await page.click(selector);
    }
    await Helpers.checkGroup(
      page,
      4,
      ManageOrders8CAContent,
      "hiddenLabel",
      `${Selectors.GovukFormLabel}`,
    );
    await page.click(radioId);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
