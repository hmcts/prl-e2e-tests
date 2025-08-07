import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { C100OrdersTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100OrdersTabContent.js";

export class C100OrdersTabPage {
  public static async c100OrdersTabPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukText16}:text-is("${C100OrdersTabContent.tabTitle}")`,
    );
    await expect(
      page.getByText(C100OrdersTabContent.typeOfOrderField),
    ).toBeVisible();
    await page.waitForSelector(
      `${Selectors.Span}${Selectors.GovukText16}:text-is("${C100OrdersTabContent.subTitle1}")`,
    );
    await page.waitForSelector(
      `${Selectors.Span}${Selectors.GovukText16}:text-is("${C100OrdersTabContent.otherdetails1}")`,
    );
    await page.waitForSelector(
      `${Selectors.Span}${Selectors.GovukText16}:text-is("${C100OrdersTabContent.orderName}")`,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
