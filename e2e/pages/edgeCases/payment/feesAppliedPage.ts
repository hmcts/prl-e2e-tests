import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../common/helpers.ts";
import { FeesAppliedContent } from "../../../fixtures/edgeCases/payment/feesAppliedContent.ts";
import { CommonStaticText } from "../../../common/commonStaticText.ts";

interface FeesAppliedPageOptions {
  page: Page;
  accessibilityTest: boolean;
  appliedHWF: boolean;
}

enum FeesAppliedSelectors {
  yes = "#hwfPaymentSelection",
  no = "#hwfPaymentSelection-2",
  inputHWF = "#helpWithFeesReference",
}

export class FeesAppliedPage {
  public static async feesAppliedPage({
    page,
    accessibilityTest,
    appliedHWF,
  }: FeesAppliedPageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.selectOption(page, appliedHWF);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.locator(
        `${Selectors.GovukHeadingXL}:text(${FeesAppliedContent.h1})`,
      ),
    ).toBeVisible();

    await Promise.all([
      expect(
        page.locator(`${Selectors.GovukLabel}:text(${CommonStaticText.yes})`),
      ).toBeVisible(),
      expect(
        page.locator(`${Selectors.GovukLabel}:text(${CommonStaticText.no})`),
      ).toBeVisible(),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async selectOption(
    page: Page,
    appliedHWF: boolean,
  ): Promise<void> {
    if (appliedHWF) {
      await page.click(FeesAppliedSelectors.yes);

      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${FeesAppliedContent.h3_yes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:text-is("${FeesAppliedContent.label_yes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHint}:text-is("${FeesAppliedContent.hint_yes}")`,
          1,
        ),
      ]);

      await page.fill(
        FeesAppliedSelectors.inputHWF,
        FeesAppliedContent.inputText_yes,
      );
    } else {
      await page.click(FeesAppliedSelectors.no);

      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          FeesAppliedContent,
          "label_no",
          `${Selectors.GovukLabel}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLink}:text-is("${FeesAppliedContent.link_no}")`,
          1,
        ),
      ]);
    }
  }
}
