import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../common/helpers.ts";
import { PayYourFeeContent } from "../../../fixtures/edgeCases/payment/payYourFeeContent.ts";

interface PayYourFeePageOptions {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: string;
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
      page.locator(`${Selectors.h1}:text(${PayYourFeeContent.h1})`),
    ).toBeVisible();
    await Helpers.checkGroup(page, 3, PayYourFeeContent, "p", `${Selectors.p}`);
    if (typeOfApplication == "DeclarationOfParentage") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${PayYourFeeContent.p_fee2}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${PayYourFeeContent.p_fee1}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
