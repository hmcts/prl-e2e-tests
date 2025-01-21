import { DummyPaymentAwp1Page } from "../../../../pages/manageCases/caseWorker/dummyPayment/dummyPaymentAwp1Page";
import { Page } from "@playwright/test";
import { DummyPaymentAwpSubmitPage } from "../../../../pages/manageCases/caseWorker/dummyPayment/dummyPaymentAwpSubmitPage";
import { Helpers } from "../../../../common/helpers";
import { DummyC100 } from "../../createCase/dummyCase/dummyC100";
import { DummyFL401 } from "../../createCase/dummyCase/dummyFL401";
import { solicitorCaseCreateType } from "../../../../common/types";

interface DummyPaymentAwpParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  paymentStatusPaid: boolean;
  caseType: solicitorCaseCreateType;
  applicantLivesInRefuge: boolean;
  otherPersonLivesInRefuge: boolean;
}

export class DummyPaymentAwp {
  public static async dummyPaymentAwp({
    page,
    errorMessaging,
    accessibilityTest,
    paymentStatusPaid,
    caseType,
    applicantLivesInRefuge,
    otherPersonLivesInRefuge,
  }: DummyPaymentAwpParams): Promise<string> {
    await this.submitCase(
      page,
      caseType,
      applicantLivesInRefuge,
      otherPersonLivesInRefuge,
    );
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

    return await Helpers.getCaseNumberFromUrl(page);
  }

  private static async submitCase(
    page: Page,
    caseType: solicitorCaseCreateType,
    applicantLivesInRefuge: boolean,
    otherPersonLivesInRefuge: boolean,
  ): Promise<void> {
    if (caseType === "C100") {
      await DummyC100.dummyC100({
        page: page,
        applicantLivesInRefuge: applicantLivesInRefuge,
        otherPersonLivesInRefuge: otherPersonLivesInRefuge,
      });
    } else {
      await DummyFL401.dummyFL401({
        page: page,
        applicantLivesInRefuge: applicantLivesInRefuge,
      });
    }
  }
}
