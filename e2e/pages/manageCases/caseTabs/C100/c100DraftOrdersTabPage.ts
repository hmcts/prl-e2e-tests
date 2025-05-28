import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { C100DraftOrdersTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100DraftOrdersTabContent.ts";

export class C100DraftOrdersTabPage {
  public static async c100DraftOrdersTabPage(
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
      `${Selectors.GovukText16}:text-is("${C100DraftOrdersTabContent.tabTitle}")`,
    );
    await expect(
      page.getByText(C100DraftOrdersTabContent.typeOfOrderField),
    ).toBeVisible();
    await page.waitForSelector(
      `${Selectors.Span}${Selectors.GovukText16}:text-is("${C100DraftOrdersTabContent.subTitle1}")`,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
