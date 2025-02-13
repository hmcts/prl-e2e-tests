import { Browser, Page } from "@playwright/test";
import { Helpers } from "./helpers.ts";
import {
  getData,
  JsonData,
  jsonDatas,
  postData,
  submitEvent,
} from "./solicitorCaseCreatorHelper.ts";
import { CaseAPIEvent } from "./types.ts";

const solicitorCaseEvents: CaseAPIEvent[] = [
  "fl401TypeOfApplication",
  "withoutNoticeOrderDetails",
  "applicantsDetails",
  "respondentsDetails",
  "fl401ApplicantFamilyDetails",
  "respondentRelationship",
  "respondentBehaviour",
  "fl401Home",
  "welshLanguageRequirements",
  "fl401StatementOfTruthAndSubmit",
  "fl401SendToGateKeeper",
  "serviceOfApplication",
];

export class SolicitorCaseCreator {
  public static async createCaseStatementOfTruthAndSubmit(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorDACaseData,
  ): Promise<string> {
    const caseRef: string = await this.createBlankCase(page);
    for (const event of solicitorCaseEvents) {
      await submitEvent(page, caseRef, event, jsonData);
      if (event === "fl401StatementOfTruthAndSubmit") {
        break;
      }
    }
    return caseRef;
  }

  public static async createCaseSendToGatekeeper(
    page: Page,
    browser: Browser,
  ): Promise<string> {
    const caseRef: string =
      await this.createCaseStatementOfTruthAndSubmit(page);
    // open new browser and sign in as court admin user
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(
      "https://manage-case.aat.platform.hmcts.net/work/my-work/list",
    );
    await submitEvent(caPage, caseRef, "fl401SendToGateKeeper");
    return caseRef;
  }

  public static async createCaseSOA(
    page: Page,
    browser: Browser,
  ): Promise<string> {
    const caseRef: string =
      await this.createCaseStatementOfTruthAndSubmit(page);
    // open new browser and sign in as court admin user
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(
      "https://manage-case.aat.platform.hmcts.net/work/my-work/list",
    );
    await submitEvent(caPage, caseRef, "fl401SendToGateKeeper");
    await submitEvent(caPage, caseRef, "serviceOfApplication");
    return caseRef;
  }

  private static async createBlankCase(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorDACaseData,
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
