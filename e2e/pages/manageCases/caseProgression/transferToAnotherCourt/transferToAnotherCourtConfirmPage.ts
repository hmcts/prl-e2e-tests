import { Page } from "@playwright/test";
import { TransferToAnotherCourtConfirmContent } from "../../../../fixtures/manageCases/caseProgression/transferToAnotherCourt/transferToAnotherCourtConfirmContent.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";

interface TransferToAnotherCourtConfirmPageParams {
  page: Page;
  accessibilityTest: boolean;
}

export class TransferToAnotherCourtConfirmPage {
  public static async transferToAnotherCourtConfirmPage({
    page,
    accessibilityTest,
  }: TransferToAnotherCourtConfirmPageParams): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.closeAndReturnToCase(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<TransferToAnotherCourtConfirmPageParams>) {
    if (!page) {
      throw new Error("No page found");
    }
    const confirmationHeader = page.locator("#confirmation-header", {
      hasText: `${TransferToAnotherCourtConfirmContent.confirmationHeader}`,
    });

    await confirmationHeader.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH1}:text-is("${TransferToAnotherCourtConfirmContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${TransferToAnotherCourtConfirmContent.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${TransferToAnotherCourtConfirmContent.p2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async closeAndReturnToCase(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
    );
  }
}
