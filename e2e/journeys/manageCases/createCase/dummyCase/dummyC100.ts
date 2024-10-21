import { Page } from "@playwright/test";
import { DummyC100ChildDetails } from "./dummyC100ChildDetails";
import { C100SubmitAndPay } from "../C100SubmitAndPay/C100SubmitAndPay";
import { DummyCreateInitial } from "./dummyCreateInitial";

interface dummyC100Options {
  page: Page;
  yesNoWelshLanguage: boolean;
  yesNoHelpWithFees: boolean;
}

export class DummyC100 {
  public static async dummyC100({
    page,
    yesNoWelshLanguage,
    yesNoHelpWithFees,
  }: dummyC100Options): Promise<void> {
    await DummyCreateInitial.createDummyCase({
      page: page,
      solicitorCaseType: "C100",
    });
    await DummyC100ChildDetails.dummyC100ChildDetails(page);
    await C100SubmitAndPay.c100SubmitAndPay({
      page,
      yesNoWelshLanguage,
      yesNoHelpWithFees,
    });
  }
}
