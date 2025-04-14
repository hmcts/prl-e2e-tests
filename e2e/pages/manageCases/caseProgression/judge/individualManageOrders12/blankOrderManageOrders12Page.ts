import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { BlankOrderManageOrders12Content } from "../../../../../fixtures/manageCases/caseProgression/judge/individualManageOrders12/blankOrderManageOrders12Content";

interface BlankOrderManageOrders12PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  fl404CustomFields_fl404bHearingOutcome = "#fl404CustomFields_fl404bHearingOutcome",
}

export class BlankOrderManageOrders12Page {
  public static async BlankOrderManageOrders12Page({
    page,
    accessibilityTest,
  }: BlankOrderManageOrders12PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<BlankOrderManageOrders12PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${BlankOrderManageOrders12Content.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${BlankOrderManageOrders12Content.formLabel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<BlankOrderManageOrders12PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.fill(
      UniqueSelectors.fl404CustomFields_fl404bHearingOutcome,
      BlankOrderManageOrders12Content.loremIpsum,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
