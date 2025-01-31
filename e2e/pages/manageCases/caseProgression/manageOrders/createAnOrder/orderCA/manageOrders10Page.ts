import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";
import { ManageOrders10CAContent } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders10CAContent.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";

interface manageOrders10PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum checkBoxIds {
  childArrangementsOrdersToIssue_childArrangementsOrder = "#childArrangementsOrdersToIssue-childArrangementsOrder",
  childArrangementsOrdersToIssue_prohibitedStepsOrder = "#childArrangementsOrdersToIssue-prohibitedStepsOrder",
  childArrangementsOrdersToIssue_specificIssueOrder = "#childArrangementsOrdersToIssue-specificIssueOrder",
}

const radioId = "#selectChildArrangementsOrder-spendTimeWithOrder";

export class ManageOrders10Page {
  public static async manageOrders10Page({
    page,
    accessibilityTest,
  }: manageOrders10PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<manageOrders10PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders10CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ManageOrders10CAContent.headingh3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders10CAContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ManageOrders10CAContent,
        "label",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<manageOrders10PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    for (const selector of Object.values(checkBoxIds)) {
      await page.click(selector);
    }
    await Helpers.checkGroup(
      page,
      4,
      ManageOrders10CAContent,
      "hiddenLabel",
      `${Selectors.GovukFormLabel}`,
    );
    await page.click(radioId);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
