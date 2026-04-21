import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ManageOrders20CAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders20CAContent.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { PreviewOrdersComponent } from "../../../../../pageObjects/components/exui/orders/previewOrders.component.ts";

interface manageOrders20PageOptions {
  page: Page;
  accessibilityTest: boolean;
  caseNumber: string;
}

export class ManageOrders20Page {
  public static async manageOrders20Page({
    page,
    accessibilityTest,
    caseNumber,
  }: manageOrders20PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest, caseNumber });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    caseNumber,
  }: Partial<manageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders20CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ManageOrders20CAContent.headingh3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders20CAContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders20CAContent.p}")`,
        1,
      ),
    ]);

    // check preview order content
    const previewOrdersComponent: PreviewOrdersComponent =
      new PreviewOrdersComponent(page);
    await previewOrdersComponent.assertOrdersPage20Contents(
      "Child arrangements, specific issue or prohibited steps order (C43)",
      caseNumber,
      "child-arrangements-order-other",
      ["caseProgression", "orders", "childArrangementsOrder"],
    );

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
  }: Partial<manageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }

    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
