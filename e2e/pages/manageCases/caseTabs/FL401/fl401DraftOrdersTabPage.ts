import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { FL401DraftOrdersTabContent } from "../../../../fixtures/manageCases/caseTabs/FL401/FL401DraftOrdersTabContent.js";

interface FL401DraftOrdersTabPageParams {
  page: Page;
  accessibilityTest: boolean;
}

export class FL401DraftOrdersTabPage {
  public static async fl401DraftOrdersTabPage({
    page,
    accessibilityTest,
  }: FL401DraftOrdersTabPageParams): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukText16, {
        hasText: FL401DraftOrdersTabContent.tabTitle,
      })
      .first()
      .waitFor();
    await page
      .getByText(FL401DraftOrdersTabContent.typeOfOrderField)
      .first()
      .waitFor();
    await page
      .getByText(FL401DraftOrdersTabContent.subTitle1)
      .first()
      .waitFor();

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
