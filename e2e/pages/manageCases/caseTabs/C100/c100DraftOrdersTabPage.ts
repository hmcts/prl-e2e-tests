import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { C100DraftOrdersTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100DraftOrdersTabContent.ts";

export class C100DraftOrdersTabPage {
  public static async c100DraftOrdersTabPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      accessibilityTest,
    );
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${C100DraftOrdersTabContent.tabTitle}")`,
    );
    await Promise.all([
      await Helpers.checkGroup(
        page,
        4,
        C100DraftOrdersTabContent,
        "subTitle",
        `${Selectors.h2}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
