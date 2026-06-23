import { solicitorCaseCreateType } from "../common/types.js";
import { APIResponse } from "@playwright/test";
import { CommonCaseEventUtils, UserInfo } from "./commonCaseEvent.utils.js";
import { jsonDatas, JsonDatas } from "../common/caseHelpers/jsonDatas.js";

export class ManageCaseEventUtils {
  constructor(private commonCaseEventsUtils: CommonCaseEventUtils) {}

  public async submitSolicitorCase(
    caseType: solicitorCaseCreateType,
  ): Promise<string> {
    const userInfo: UserInfo = {
      email: process.env.SOLICITOR_USERNAME,
      password: process.env.SOLICITOR_PASSWORD,
    };

    const caseId: string = await this.createTSSolicitorCase(caseType, userInfo);

    if (caseType === "C100") {
      const eventData: JsonDatas = jsonDatas.solicitorCACaseData;
      await this.commonCaseEventsUtils.completeEvent({
        caseId: caseId,
        eventId: "submitAndPay",
        eventData: eventData.submitAndPay,
        userInfo: userInfo,
      });
      await this.commonCaseEventsUtils.completeEvent({
        caseId: caseId,
        eventId: "testingSupportPaymentSuccessCallback",
        eventData: eventData.testingSupportPaymentSuccessCallback,
        userInfo: userInfo,
      });
    } else {
      const eventData: JsonDatas = jsonDatas.solicitorDACaseData;
      await this.commonCaseEventsUtils.completeEvent({
        caseId: caseId,
        eventId: "fl401StatementOfTruthAndSubmit",
        eventData: eventData.fl401StatementOfTruthAndSubmit,
        userInfo: userInfo,
      });
    }

    return caseId;
  }

  private async createTSSolicitorCase(
    caseType: solicitorCaseCreateType,
    userInfo: UserInfo,
  ): Promise<string> {
    const bearerToken: string =
      await this.commonCaseEventsUtils.getBearerToken(userInfo);

    const s2sToken: string =
      await this.commonCaseEventsUtils.getServiceToken("prl_cos_api");

    // get event token
    let eventToken: string;
    await this.commonCaseEventsUtils.retry(async () => {
      const apiContext = await this.commonCaseEventsUtils.createApiContext();
      const urlFetchToken = `${process.env.CCD_DATA_STORE_URL as string}/caseworkers/04cd097c-d159-4c30-9fae-8f6af307cdee/jurisdictions/PRIVATELAW/case-types/PRLAPPS/event-triggers/testingSupportDummySolicitorCreate/token`;
      const getTokenResponse = await apiContext.get(urlFetchToken, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ServiceAuthorization: `Bearer ${s2sToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!getTokenResponse.ok()) {
        throw new Error(
          `Failed to fetch TS support event token: ${getTokenResponse.status()} - ${await getTokenResponse.text()}`,
        );
      }

      const responseJson = await getTokenResponse.json();
      eventToken = responseJson.token;
    });

    // submit event
    let submitEventResponse: APIResponse;
    await this.commonCaseEventsUtils.retry(async () => {
      const apiContext = await this.commonCaseEventsUtils.createApiContext();
      const caseData = {
        data: {
          caseTypeOfApplication: caseType,
          applicantOrganisationPolicy: null,
          applicantCaseName: "TEST",
        },
        draft_id: null,
        event: {
          id: "testingSupportDummySolicitorCreate",
          summary: "",
          description: "",
        },
        event_token: eventToken,
        ignore_warning: false,
      };
      const urlCreateCase = `${process.env.CCD_DATA_STORE_URL as string}/caseworkers/04cd097c-d159-4c30-9fae-8f6af307cdee/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases`;
      submitEventResponse = await apiContext.post(urlCreateCase, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ServiceAuthorization: `Bearer ${s2sToken}`,
          "Content-Type": "application/json",
        },
        data: caseData,
      });

      if (!submitEventResponse.ok()) {
        throw new Error(
          `Failed to create TS support case: ${submitEventResponse.status()} - ${await submitEventResponse.text()}`,
        );
      }
    });

    const responseJson = await submitEventResponse.json();
    return String(responseJson.id);
  }
}
