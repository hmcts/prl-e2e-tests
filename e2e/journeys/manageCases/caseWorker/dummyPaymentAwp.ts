import { DummyPaymentAwp1Page } from "../../../pages/manageCases/caseWorker/dummyPaymentAwp1Page";
import { Page } from "@playwright/test";
import { DummyPaymentAwpSubmitPage } from "../../../pages/manageCases/caseWorker/dummyPaymentAwpSubmitPage";
import { Helpers } from "../../../common/helpers";
import { DummyC100 } from "../createCase/dummyCase/dummyC100";
import { DummyPaymentConfirmation } from "./dummyPaymentConfirmation";
import { DummyFL401 } from "../createCase/dummyCase/dummyFL401";

interface DummyPaymentAwpParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  isC100: boolean;
  paymentStatusPaid: boolean;
}

export class DummyPaymentAwp {
  public static async dummyPaymentAwp({
    page,
    errorMessaging,
    accessibilityTest,
    isC100,
    paymentStatusPaid,
  }: DummyPaymentAwpParams): Promise<void> {
    // submit a case before dummy payment Awp journey
    if (isC100) {
      const yesNoWelshLanguage: boolean = false;
      const yesNoHelpWithFees: boolean = false;
      await DummyC100.dummyC100({
        page,
        yesNoWelshLanguage,
        yesNoHelpWithFees,
      });
      await DummyPaymentConfirmation.dummyPaymentConfirmation({
        page,
        accessibilityTest,
      });
    } else {
      await DummyFL401.dummyFL401({page});
    }
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
