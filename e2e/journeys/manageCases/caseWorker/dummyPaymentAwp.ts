import { DummyPaymentAwp1Page } from "../../../pages/manageCases/caseWorker/dummyPaymentAwp1Page";
import { Page } from "@playwright/test";
import { DummyPaymentAwpSubmitPage } from "../../../pages/manageCases/caseWorker/dummyPaymentAwpSubmitPage";
import { Selectors } from "../../../common/selectors";

interface DummyPaymentAwpParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  paymentStatusPaid: boolean;
}

const nextStepDropdownSelector = "#next-step";

enum NextStepSelectorContent {
  dummyPaymentAwp = "Dummy Payment for AwP",
  go = "Go"
}

export class DummyPaymentAwp {
  public static async dummyPaymentAwp({
    page,
    errorMessaging,
    accessibilityTest,
    paymentStatusPaid,
  }: DummyPaymentAwpParams): Promise<void> {
    await page.selectOption(`${nextStepDropdownSelector}`, `${NextStepSelectorContent.dummyPaymentAwp}`);
    await page.waitForTimeout(2000);
    await page.click(`${Selectors.button}:text-is("${NextStepSelectorContent.go}")`);
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
