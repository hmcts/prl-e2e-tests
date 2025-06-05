import { DummyPaymentAwp1Page } from "../../../../pages/manageCases/caseWorker/dummyPayment/dummyPaymentAwp1Page.ts";
import { Page } from "@playwright/test";
import { DummyPaymentAwpSubmitPage } from "../../../../pages/manageCases/caseWorker/dummyPayment/dummyPaymentAwpSubmitPage.ts";
import { Helpers } from "../../../../common/helpers.ts";

interface DummyPaymentAwpParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  paymentStatusPaid: boolean;
}

export class DummyPaymentAwp {
  public static async dummyPaymentAwp({
    page,
    errorMessaging,
    accessibilityTest,
    paymentStatusPaid,
  }: DummyPaymentAwpParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Dummy Payment for AwP");
    await DummyPaymentAwp1Page.dummyPaymentAwp1Page(
      page,
      errorMessaging,
      accessibilityTest,
      paymentStatusPaid,
    );
    await DummyPaymentAwpSubmitPage.dummyPaymentAwpSubmitPage(
      page,
      accessibilityTest,
      paymentStatusPaid,
    );
  }
}
