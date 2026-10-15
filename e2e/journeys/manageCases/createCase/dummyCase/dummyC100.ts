import { Page } from "@playwright/test";
import { DummyC100ChildDetails } from "./dummyC100ChildDetails.ts";
import { C100SubmitAndPay } from "../C100SubmitAndPay/C100SubmitAndPay.ts";
import { DummyCreateInitial } from "./dummyCreateInitial.ts";
import { DummyC100ApplicantDetails } from "./dummyC100ApplicantDetails.ts";
import { DummyC100OtherPersonDetails } from "./dummyC100OtherPersonDetails.ts";
import { Helpers } from "../../../../common/helpers.ts";

interface dummyC100Options {
  page: Page;
  applicantLivesInRefuge: boolean;
  otherPersonLivesInRefuge: boolean;
}

export class DummyC100 {
  public static async dummyC100({
    page,
    applicantLivesInRefuge,
    otherPersonLivesInRefuge,
  }: dummyC100Options): Promise<string> {
    await DummyCreateInitial.createDummyCase({
      page: page,
      solicitorCaseType: "C100",
    });
    if (applicantLivesInRefuge) {
      await DummyC100ApplicantDetails.dummyC100ApplicantDetails(
        page,
        applicantLivesInRefuge,
      );
    }
    if (otherPersonLivesInRefuge) {
      await DummyC100OtherPersonDetails.dummyC100OtherPersonDetails(
        page,
        otherPersonLivesInRefuge,
      );
    }
    // currently need to complete child details event as it is the only event not pre-completed for a dummy case
    await DummyC100ChildDetails.dummyC100ChildDetails(page);
    const caseRef: string = await Helpers.getCaseNumberFromUrl(page);
    await C100SubmitAndPay.c100SubmitAndPay({
      page: page,
      yesNoWelshLanguage: false,
      yesNoHelpWithFees: false,
      accessibilityTest: false,
    });

    // complete dummy payment confirmation
    await Helpers.chooseEventFromDropdown(page, "Dummy Payment confirmation");
    await page.getByRole("button", { name: "Make the payment" }).click();

    return caseRef;
  }
}
