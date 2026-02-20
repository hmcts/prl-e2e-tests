import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
// import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../common/helpers";
import { FeesAppliedContent } from "../../../fixtures/edgeCases/payment/feesAppliedContent";
import { CommonStaticText } from "../../../common/commonStaticText";

interface FeesAppliedPageOptions {
  page: Page;
  accessibilityTest: boolean;
  appliedHWF: boolean;
}

enum FeesAppliedSelectors {
  yes = "#feesAppliedDetails",
  no = "#feesAppliedDetails",
  inputHWF = "#helpWithFeesReferenceNumber",
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
    const locator = page.locator(Selectors.h1, {
      hasText: FeesAppliedContent.h1,
    });
    await locator.waitFor();
    await Promise.all([
      expect(
        page.locator(Selectors.GovukLabel, { hasText: CommonStaticText.yes }),
      ).toBeVisible(),
      expect(
        page.locator(Selectors.GovukLabel, { hasText: CommonStaticText.no }),
      ).toBeVisible(),
    ]);

    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); //"Ensure an element's role supports its ARIA attributes"
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
          `${Selectors.h3}:has-text("${FeesAppliedContent.h3_yes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:has-text("${FeesAppliedContent.label_yes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHint}:has-text("${FeesAppliedContent.hint_yes}")`,
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
          `${Selectors.GovukLink}:has-text("${FeesAppliedContent.link_no}")`,
          1,
        ),
      ]);
    }
  }
}
