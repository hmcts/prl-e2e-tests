import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { DummyPaymentConfirmationPage } from "../../../../pages/manageCases/caseWorker/dummyPayment/dummyPaymentConfirmationPage.ts";

interface DummyPaymentConfirmationParams {
  page: Page;
}

export class DummyPaymentConfirmation {
  public static async dummyPaymentConfirmation({
    page,
  }: DummyPaymentConfirmationParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Dummy Payment confirmation");
    await DummyPaymentConfirmationPage.dummyPaymentConfirmationPage(page);
  }
}
