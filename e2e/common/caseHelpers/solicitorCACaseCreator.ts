import { Page, Browser } from "@playwright/test";
import {
  createBlankCase,
  createTSSolicitorCase,
  JsonData,
  jsonDatas,
  submitEvent,
} from "./solicitorCaseCreatorHelper.ts";
import { Helpers } from "../helpers.ts";
import config from "../../utils/config.utils.ts";
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

export class SolicitorCACaseCreator {
  public static async createCaseSubmitAndPay(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorCACaseData,
  ): Promise<string> {
    const caseRef = await createTSSolicitorCase(page, "C100");
    await submitEvent(page, caseRef, "submitAndPay", jsonData);
    await submitEvent(
      page,
      caseRef,
      "testingSupportPaymentSuccessCallback",
      jsonData,
    );
    return caseRef;
  }

  public static async createCaseSubmitAndPayIndividualEvents(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorCACaseData,
  ): Promise<string> {
    const caseRef = await createBlankCase(page, jsonData);
    for (const event of solicitorCaseEvents) {
      await submitEvent(page, caseRef, event, jsonData);
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
  public static async c100sendToGatekeeper(
    browser: Browser,
    caseRef: string,
  ): Promise<void> {
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      caPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    //CA json data currently sending to judge - "Elizabeth Williams". Need to rework payload strategy to point to LA or different judge as & when required - FPVTL-995
    await submitEvent(
      caPage,
      caseRef,
      "sendToGateKeeper",
      jsonDatas.solicitorCACaseData,
    );
  }
}
