import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { createOrderFL401Options } from "../../../../common/types.js";
import {
  FL401DraftOrdersTabContent
} from "../../../../fixtures/manageCases/caseTabs/FL401/FL401DraftOrdersTabContent.js";

interface FL401DraftOrdersTabPageParams {
  page: Page;
  accessibilityTest: boolean;
  createOrderFL401Options: createOrderFL401Options;
}

export class FL401DraftOrdersTabPage {
  public static async fl401DraftOrdersTabPage({
    page,
    accessibilityTest,
    createOrderFL401Options: createOrderFL401Options,
  }: FL401DraftOrdersTabPageParams): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.validateOrderType({
      page,
      createOrderFL401Options,
    });
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukText16, {
        hasText: FL401DraftOrdersTabContent.tabTitle,
      }).first()
      .waitFor();
    await page.getByText(FL401DraftOrdersTabContent.typeOfOrderField).first().waitFor();
    await page.getByText(FL401DraftOrdersTabContent.subTitle1).first().waitFor();

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async validateOrderType({
    page,
    createOrderFL401Options,
  }: Partial<FL401DraftOrdersTabPageParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }

    switch (createOrderFL401Options) {
      case "amend discharge varied order":
        await page
          .locator(Selectors.Span, {
            hasText: FL401DraftOrdersTabContent.spanAmendDischargedVaried,
          }).first()
          .waitFor();
        break;
    }
  }
}
