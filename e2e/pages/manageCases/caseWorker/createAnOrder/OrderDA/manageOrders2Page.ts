import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ManageOrders2DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders2DAContent";

interface ManageOrders2PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  nonMolestationOrderFL404A = "#createSelectOrderOptions-nonMolestation",
}

export class ManageOrders2Page {
  public static async manageOrders2Page({
    page,
    accessibilityTest,
  }: ManageOrders2PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders2PageOptions>): Promise<void> {
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
        `${Selectors.h2}:text-is("${ManageOrders2DAContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ManageOrders2DAContent.govUkInsetText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        17,
        ManageOrders2DAContent,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(UniqueSelectors.nonMolestationOrderFL404A);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
