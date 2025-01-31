import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { ManageOrders19CAContent } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/orderCA/manageOrders19CAContent.ts";

interface manageOrders19PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

const inputId = "#ordersHearingDetails_0_hearingTypes";
const radioId =
  "#ordersHearingDetails_0_hearingDateConfirmOptionEnum-dateConfirmedByListingTeam";

export class ManageOrders19Page {
  public static async manageOrders19Page({
    page,
    accessibilityTest,
  }: manageOrders19PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
  }: Partial<manageOrders19PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders19CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ManageOrders19CAContent.headingh3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ManageOrders19CAContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders19CAContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${ManageOrders19CAContent.headingh2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ManageOrders19CAContent.headingh2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        ManageOrders19CAContent,
        "label",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    // if (accessibilityTest) {                     accessibility bug ticket raised: FPET-1210
    //   await AccessibilityTestHelper.run(page);
    // }
  }

  private static async fillInFields({
    page,
  }: Partial<manageOrders19PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.selectOption(inputId, ManageOrders19CAContent.hearingType);
    await page.click(radioId);
    await page.waitForSelector(
      `${Selectors.strong}:text-is("${ManageOrders19CAContent.strong}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormHint}:text-is("${ManageOrders19CAContent.hint}")`,
      1,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
