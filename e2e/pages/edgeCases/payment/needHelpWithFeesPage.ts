import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../common/helpers.ts";
import { NeedHelpWithFeesContent } from "../../../fixtures/edgeCases/payment/needHelpWithFeesContent.ts";
import { EdgeCaseApplicationType } from "../../../common/types.ts";
import { CommonContent } from "../../../fixtures/manageCases/commonContent.ts";

interface NeedHelpWithFeesOptions {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
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
    typeOfApplication,
    helpWithFees,
  }: NeedHelpWithFeesOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest, typeOfApplication);
    await this.selectOption(page, helpWithFees);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    typeOfApplication: EdgeCaseApplicationType,
  ): Promise<void> {
    const locator = page.locator(Selectors.h1, {
      hasText: NeedHelpWithFeesContent.h1,
    });
    await locator.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        NeedHelpWithFeesContent,
        "li",
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
        `${Selectors.p}:has-text("${NeedHelpWithFeesContent.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${NeedHelpWithFeesContent.p2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:has-text("${NeedHelpWithFeesContent.link}")`,
        1,
      ),
    ]);
    if (typeOfApplication == "DeclarationOfParentage") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${NeedHelpWithFeesContent.p_fee2}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${CommonContent.c100Fee}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
