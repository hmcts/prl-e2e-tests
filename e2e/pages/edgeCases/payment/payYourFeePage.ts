import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../common/helpers.ts";
import { PayYourFeeContent } from "../../../fixtures/edgeCases/payment/payYourFeeContent.ts";
import { NeedHelpWithFeesContent } from "../../../fixtures/edgeCases/payment/needHelpWithFeesContent.ts";
import { EdgeCaseApplicationType } from "../../../common/types.ts";
import { CommonContent } from "../../../fixtures/manageCases/commonContent.ts";

interface PayYourFeePageOptions {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
}

export class PayYourFeePage {
  public static async payYourFeePage({
    page,
    accessibilityTest,
    typeOfApplication,
  }: PayYourFeePageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest, typeOfApplication });
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    typeOfApplication,
  }: PayYourFeePageOptions): Promise<void> {
    await expect(
      page.locator(`${Selectors.h1}:has-text("${PayYourFeeContent.h1}")`),
    ).toBeVisible();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${PayYourFeeContent.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${PayYourFeeContent.p2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${PayYourFeeContent.p1}")`,
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
}
