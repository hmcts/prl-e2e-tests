import { DummyPaymentAwp1Page } from "../../../pages/manageCases/caseWorker/dummyPaymentAwp1Page";
import { Page } from "@playwright/test";
import { DummyPaymentAwpSubmitPage } from "../../../pages/manageCases/caseWorker/dummyPaymentAwpSubmitPage";
import { Fl401StatementOfTruth } from "../createCase/FL401StatementOfTruth/fl401StatementOfTruth";
import { Helpers } from "../../../common/helpers";

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
    // submit a case before dummy payment Awp journey
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401YesNoToEverything: false,
      subJourney: true,
    });
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
