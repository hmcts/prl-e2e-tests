import { Page } from "@playwright/test";
import {
  createBlankCase,
  JsonData,
  jsonDatas,
  submitEvent,
} from "./solicitorCaseCreatorHelper.ts";
import { solicitorCACaseAPIEvent } from "./types.ts";

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

export class SolicitorCACaseCreator {
  public static async createCaseSubmitAndPay(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorCACaseData,
  ): Promise<string> {
    const caseRef: string = await createBlankCase(page, jsonData);
    for (const event of solicitorCaseEvents) {
      console.log(`Starting event: ${event}`);
      await submitEvent(page, caseRef, event, jsonData);
      console.log(`Finished event: ${event}`);
    }
    return caseRef;
  }
}
