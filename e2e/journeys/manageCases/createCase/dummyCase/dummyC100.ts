import { Page } from "@playwright/test";
import { DummyC100ChildDetails } from "./dummyC100ChildDetails.ts";
import { C100SubmitAndPay } from "../C100SubmitAndPay/C100SubmitAndPay.ts";
import { DummyCreateInitial } from "./dummyCreateInitial.ts";
import { DummyC100ApplicantDetails } from "./dummyC100ApplicantDetails.ts";
import { DummyC100OtherPersonDetails } from "./dummyC100OtherPersonDetails.ts";
import { Helpers } from "../../../../common/helpers.ts";
import {
  jsonDatas
} from "../../../../common/caseHelpers/jsonDatas.ts";
import { CaseEventUtils } from "../../../../utils/caseEvent.utils.js";

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
    await C100SubmitAndPay.c100SubmitAndPay({
      page: page,
      yesNoWelshLanguage: false,
      yesNoHelpWithFees: false,
      accessibilityTest: false,
    });
    const caseRef: string = await Helpers.getCaseNumberFromUrl(page);
    const caseEventUtils = new CaseEventUtils();
    await caseEventUtils.submitEvent(
      page,
      caseRef,
      "testingSupportPaymentSuccessCallback",
      jsonDatas.solicitorCACaseData,
    );
    return caseRef;
  }
}
