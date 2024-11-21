import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders10Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders10Content";
import { CommonStaticText } from "../../../../../common/commonStaticText";

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
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders10Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ManageOrders10Content.headingh3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders10Content.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ManageOrders10Content,
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
      ManageOrders10Content,
      "hiddenLabel",
      `${Selectors.GovukFormLabel}`,
    );
    await page.click(radioId);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
