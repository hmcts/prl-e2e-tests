import { Page, Browser } from "@playwright/test";
import {
  createBlankCase,
  jsonDatas,
  submitEvent,
} from "./solicitorCaseCreatorHelper.ts";
import { solicitorCACaseAPIEvent } from "../types.ts";
import { Helpers } from "../helpers.ts";
import config from "../../utils/config.utils.ts";

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
    mandatoryEventsOnly: boolean = false,
  ): Promise<string> {
    const jsonData = jsonDatas.solicitorCACaseData;
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

  public static async c100IssueAndSendToLocalCourt(
    browser: Browser,
    caseRef: string,
  ): Promise<void> {
    const ctscPage = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      ctscPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await submitEvent(
      ctscPage,
      caseRef,
      "issueAndSendToLocalCourtCallback",
      jsonDatas.solicitorCACaseData,
    );
  }
}
