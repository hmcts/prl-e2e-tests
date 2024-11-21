import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders2Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders2Content";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface manageOrders2PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

const radioId =
  "#createSelectOrderOptions-childArrangementsSpecificProhibitedOrder";

export class ManageOrders2Page {
  public static async manageOrders2Page({
    page,
    accessibilityTest,
  }: manageOrders2PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<manageOrders2PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders2Content.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ManageOrders2Content.insetText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        17,
        ManageOrders2Content,
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
  }: Partial<manageOrders2PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(radioId);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
