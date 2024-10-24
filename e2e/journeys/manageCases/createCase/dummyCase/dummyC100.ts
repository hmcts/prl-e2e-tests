import { Page } from "@playwright/test";
import { DummyC100ChildDetails } from "./dummyC100ChildDetails";
import { C100SubmitAndPay } from "../C100SubmitAndPay/C100SubmitAndPay";
import { DummyCreateInitial } from "./dummyCreateInitial";
import { DummyPaymentConfirmation } from "../../caseWorker/dummyPaymentConfirmation";

interface dummyC100Options {
  page: Page;
}

export class DummyC100 {
  public static async dummyC100({ page }: dummyC100Options): Promise<void> {
    await DummyCreateInitial.createDummyCase({
      page: page,
      solicitorCaseType: "C100",
    });
    // currently need to complete child details event as it is the only event not pre-completed for a dummy case
    await DummyC100ChildDetails.dummyC100ChildDetails(page);
    await C100SubmitAndPay.c100SubmitAndPay({
      page: page,
      yesNoWelshLanguage: false,
      yesNoHelpWithFees: false,
    });
    await DummyPaymentConfirmation.dummyPaymentConfirmation({
      page,
    });
  }
}
