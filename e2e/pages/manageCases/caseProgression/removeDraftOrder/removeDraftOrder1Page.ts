import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { RemoveDraftOrder1Content } from "../../../../fixtures/manageCases/caseProgression/removeDraftOrder/removeDraftOrder1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface RemoveDraftOrder1PageParams {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  dropDownSelector = "#removeDraftOrdersDynamicList",
}

export class RemoveDraftOrder1Page {
  public static async removeDraftOrder1Page({
    page,
    accessibilityTest,
  }: RemoveDraftOrder1PageParams): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.selectDropDown(page);
    await this.continue(page);
  }

  private static async checkPageLoads(page: Page, accessibilityTest: boolean) {
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${RemoveDraftOrder1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${RemoveDraftOrder1Content.formLabel}")`,
      1,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async selectDropDown(page: Page) {
    await page.selectOption(UniqueSelectors.dropDownSelector, { index: 1 });
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
