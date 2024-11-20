import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import {
  ManageOrders2Content
} from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders2Content";

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
      `${Selectors.h1}:text-is("${ManageOrders1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders2Content.h2}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ManageOrders2Content.govUkInsetText}")`,
        1
      ),
      Helpers.checkGroup(
        page,
        17,
        ManageOrders2Content,
        "formLabel",
        Selectors.GovukFormLabel
      )
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
