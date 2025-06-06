import { Page } from "@playwright/test";
import { PayPage } from "../../../../../pages/citizen/createCase/C100/pay/payPage.ts";
import { PaymentConfirmationPage } from "../../../../../pages/citizen/createCase/C100/pay/paymentConfirmationPage.ts";

interface C100PayOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

export class C100Pay {
  public static async c100Pay({
    page,
    accessibilityTest,
    errorMessaging,
  }: C100PayOptions): Promise<void> {
    await PayPage.payPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await PaymentConfirmationPage.paymentConfirmationPage({
      page: page,
      accessibilityTest: accessibilityTest,
    });
  }
}
