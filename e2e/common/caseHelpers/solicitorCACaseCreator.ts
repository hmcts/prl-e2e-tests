import { Page } from "@playwright/test";
import {
  createBlankCase,
  JsonData,
  jsonDatas,
  submitEvent,
} from "./solicitorCaseCreatorHelper.ts";
import { solicitorCACaseAPIEvent } from "../types.ts";

const solicitorCaseEvents: solicitorCACaseAPIEvent[] = [
  "selectApplicationType",
  "hearingUrgency",
  "applicantsDetails",
  "respondentsDetails",
  "otherPeopleInTheCaseRevised",
  "childDetailsRevised",
  "otherChildNotInTheCase",
  "childrenAndApplicants",
  "childrenAndRespondents",
  "childrenAndOtherPeople",
  "allegationsOfHarmRevised",
  "miamPolicyUpgrade",
  "internationalElement",
  "welshLanguageRequirements",
  "submitAndPay",
  "testingSupportPaymentSuccessCallback",
];

const solicitorCaseMandatoryEvents: solicitorCACaseAPIEvent[] = [
  "selectApplicationType",
  "hearingUrgency",
  "applicantsDetails",
  "respondentsDetails",
  "otherPeopleInTheCaseRevised",
  "childDetailsRevised",
  "otherChildNotInTheCase",
  "childrenAndApplicants",
  "childrenAndRespondents",
  "childrenAndOtherPeople",
  "allegationsOfHarmRevised",
  "miamPolicyUpgrade",
  "submitAndPay",
  "testingSupportPaymentSuccessCallback",
];

export class SolicitorCACaseCreator {
  public static async createCaseSubmitAndPay(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorCACaseData,
    mandatoryEventsOnly: boolean = false,
  ): Promise<string> {
    const caseRef: string = await createBlankCase(page, jsonData);
    if (mandatoryEventsOnly) {
      for (const event of solicitorCaseMandatoryEvents) {
        await submitEvent(page, caseRef, event, jsonData);
      }
    } else {
      for (const event of solicitorCaseEvents) {
        await submitEvent(page, caseRef, event, jsonData);
      }
    }
    return caseRef;
  }
}
