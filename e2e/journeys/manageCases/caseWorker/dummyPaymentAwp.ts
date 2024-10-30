import { DummyPaymentAwp1Page } from "../../../pages/manageCases/caseWorker/dummyPaymentAwp1Page";
import { Page } from "@playwright/test";
import { DummyPaymentAwpSubmitPage } from "../../../pages/manageCases/caseWorker/dummyPaymentAwpSubmitPage";
import { Helpers } from "../../../common/helpers";
import { DummyC100 } from "../createCase/dummyCase/dummyC100";
import { DummyFL401 } from "../createCase/dummyCase/dummyFL401";
import { solicitorCaseCreateType } from "../../../common/types";

interface DummyPaymentAwpParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  paymentStatusPaid: boolean;
  caseType: solicitorCaseCreateType;
}

export class DummyPaymentAwp {
  public static async dummyPaymentAwp({
    page,
    errorMessaging,
    accessibilityTest,
    paymentStatusPaid,
    caseType,
  }: DummyPaymentAwpParams): Promise<void> {
    await this.submitCase(page, caseType);
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

  private static async submitCase(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    if (caseType === "C100") {
      await DummyC100.dummyC100({ page });
    } else {
      await DummyFL401.dummyFL401({ page });
    }
  }
}
