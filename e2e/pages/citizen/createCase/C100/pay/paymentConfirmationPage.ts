import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { PaymentConfirmationContent } from "../../../../../fixtures/citizen/createCase/C100/pay/paymentConfirmationContent";

interface PaymentConfirmationOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class PaymentConfirmationPage {
  public static async paymentConfirmationPage({
    page,
    accessibilityTest,
  }: PaymentConfirmationOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: PaymentConfirmationOptions): Promise<void> {
    await page
      .locator(
        `${Selectors.GovukHeadingXL}:text-is("${PaymentConfirmationContent.pageTitle}")`,
      )
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        PaymentConfirmationContent,
        "tableHeader",
        Selectors.th,
      ),
      Helpers.checkGroup(
        page,
        5,
        PaymentConfirmationContent,
        "tableData",
        Selectors.td,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${PaymentConfirmationContent.confirmationButton}")`,
    );
  }
}
