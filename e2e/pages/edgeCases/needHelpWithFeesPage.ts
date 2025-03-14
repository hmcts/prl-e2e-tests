import { Page, expect } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../common/helpers.ts";
import { NeedHelpWithFeesContent } from "../../fixtures/edgeCases/needHelpWithFeesContent.ts";

interface NeedHelpWithFeesOptions {
  page: Page;
  accessibilityTest: boolean;
  helpWithFees: boolean;
}

enum UniqueSelectors {
  yes = "#hwfPaymentSelection",
  no = "#hwfPaymentSelection-2",
}

export class NeedHelpWithFeesPage {
  public static async needHelpWithFees({
    page,
    accessibilityTest,
    helpWithFees,
  }: NeedHelpWithFeesOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.selectOption(page, helpWithFees);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await expect(page.locator(
      `${Selectors.h1}:text(${NeedHelpWithFeesContent.h1})`)).toBeVisible();
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        NeedHelpWithFeesContent,
        "l1",
        `${Selectors.li}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        NeedHelpWithFeesContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${NeedHelpWithFeesContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${NeedHelpWithFeesContent.link}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async selectOption(
    page: Page,
    helpWithFees?: boolean,
  ): Promise<void> {
    {
      if (helpWithFees) {
        await page.check(UniqueSelectors.yes);
      } else {
        await page.check(UniqueSelectors.no);
      }
    }
  }
}
