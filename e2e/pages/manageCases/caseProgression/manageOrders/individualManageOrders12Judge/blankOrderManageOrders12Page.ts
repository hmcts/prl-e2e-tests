import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/OrderDA/manageOrders1DAContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { BlankOrderManageOrders12Content } from "../../../../../fixtures/manageCases/caseProgression/manageOrders/individualManageOrders12/blankOrderManageOrders12Content.ts";

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
