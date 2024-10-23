import { Page } from "@playwright/test";
import { Helpers } from "../../../common/helpers";
import { DummyPaymentConfirmationPage } from "../../../pages/manageCases/caseWorker/dummyPaymentConfirmationPage";

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
