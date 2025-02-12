import { Page } from "@playwright/test";
import {
  getData,
  JsonData,
  jsonDatas,
  postData,
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
    const caseRef: string = await this.createBlankCase(page);
    for (const event of solicitorCaseEvents) {
      console.log(`Starting event: ${event}`);
      await submitEvent(page, caseRef, event, jsonData);
      console.log(`Finished event: ${event}`);
    }
    return caseRef;
  }

  private static async createBlankCase(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorCACaseData,
  ): Promise<string> {
    const startCaseCreationUrl = `/data/internal/case-types/PRLAPPS/event-triggers/solicitorCreate?ignore-warning=false`;

    const startCaseCreationHeaders = {
      Accept:
        "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8",
      Experimental: "true",
      "Content-type": "application/json; charset=UTF-8",
    };
    const eventToken: string = await getData(
      page,
      startCaseCreationUrl,
      startCaseCreationHeaders,
    );

    const submitCaseUrl = `/data/case-types/PRLAPPS/cases?ignore-warning=false`;
    const data = {
      data: jsonData.solicitorCreate.data,
      draft_id: null,
      event: {
        id: "solicitorCreate",
        summary: "",
        description: "",
      },
      event_token: eventToken,
      ignore_warning: false,
    };
    const submitEventHeaders = {
      Accept:
        "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8",
      Experimental: "true",
      "Content-type": "application/json; charset=UTF-8",
    };
    return await postData(
      page,
      submitCaseUrl,
      submitEventHeaders,
      JSON.stringify(data),
    );
  }
}
