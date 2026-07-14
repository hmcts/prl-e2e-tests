import { OrderTypes, solicitorCaseCreateType } from "../common/types.js";
import { APIResponse } from "@playwright/test";
import { CommonCaseEventUtils, UserInfo } from "./commonCaseEvent.utils.js";
import { jsonDatas, JsonDatas } from "../common/caseHelpers/jsonDatas.js";
import {
  AmendDischargedVariedOrderActionData,
  ChildArrangementsOrderActionData,
  OrderActionData,
  PowerOfArrestOrderActionData,
} from "../testData/orderActionData.js";

interface SendToGatekeeperParams {
  isSpecificGatekeeper: boolean;
  isJudge?: boolean; // else legal adviser
}

interface LocalCourtInfo {
  code: string;
  label: string;
}

interface OrderOptions {
  caseId: string;
  orderType: OrderTypes;
  isDraft: boolean; // if not final
  doServe: boolean;
}

export class ManageCaseEventUtils {
  constructor(private commonCaseEventsUtils: CommonCaseEventUtils) {}

  public async submitTSSolicitorCase(
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
          applicantCaseName: "TEST", // TODO: make this some random string so it is easier to track
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

  // default to Aberystwyth court
  async issueAndSendToLocalCourt(
    caseId: string,
    localCourtInfo: LocalCourtInfo = {
      code: "827534:",
      label: "Aberystwyth Justice Centre - Trefechan - SY23 1AS",
    },
  ): Promise<void> {
    await this.commonCaseEventsUtils.completeEvent({
      caseId: caseId,
      eventId: "issueAndSendToLocalCourtCallback",
      eventData: {
        data: {
          courtList: {
            value: {
              code: localCourtInfo.code,
              label: localCourtInfo.label,
            },
          },
        },
      },
      userInfo: {
        email: process.env.COURT_ADMIN_STOKE_USERNAME as string,
        password: process.env.COURT_ADMIN_STOKE_PASSWORD as string,
      },
    });
  }

  async addCaseNumber(caseId: string, familyManNumber?: string): Promise<void> {
    await this.commonCaseEventsUtils.completeEvent({
      caseId: caseId,
      eventId: "fl401AddCaseNumber",
      eventData: {
        data: {
          familymanCaseNumber: familyManNumber ?? "123",
        },
      },
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  // currently this method is setup for the static users - it would need to be adapted if we want to use ad-hoc gatekeepers
  // TODO: for some reason the legal adviser request succeeds but the role doesn't get added correctly
  async sendToGatekeeper(
    caseId: string,
    caseType: solicitorCaseCreateType,
    sendToGatekeeperParams: SendToGatekeeperParams = {
      isSpecificGatekeeper: false,
      isJudge: false,
    },
  ): Promise<void> {
    let eventData;
    if (sendToGatekeeperParams.isSpecificGatekeeper) {
      if (sendToGatekeeperParams.isJudge) {
        const judgeUserDetails =
          await this.commonCaseEventsUtils.getUserDetails(
            process.env.JUDGE_USERNAME,
          );

        eventData = {
          data: {
            isJudgeOrLegalAdviserGatekeeping: "judge",
            isSpecificGateKeeperNeeded: "Yes",
            judgeName: {
              idamId: judgeUserDetails.id as string,
              personalCode: "4923961", // this is the same for the static judge across AAT and DEMO
            },
          },
        };
      } else {
        const laUserDetails = await this.commonCaseEventsUtils.getUserDetails(
          process.env.LEGALADVISOR_USERNAME,
        );

        eventData = {
          data: {
            isJudgeOrLegalAdviserGatekeeping: "legalAdviser",
            isSpecificGateKeeperNeeded: "Yes",
            legalAdviserList: {
              value: {
                code: `${laUserDetails.surname}(${laUserDetails.email})`,
                label: `${laUserDetails.surname}(${laUserDetails.email})`,
              },
            },
          },
        };
      }
    } else {
      eventData = {
        data: {
          isSpecificGateKeeperNeeded: "No",
        },
      };
    }

    await this.commonCaseEventsUtils.completeEvent({
      caseId: caseId,
      eventId:
        caseType === "C100" ? "sendToGateKeeper" : "fl401SendToGateKeeper",
      eventData: eventData,
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  async createOrder({
    caseId,
    orderType,
    isDraft,
    doServe,
  }: OrderOptions): Promise<void> {
    let orderActionData: OrderActionData;
    switch (orderType) {
      case "Power of arrest (FL406)":
        orderActionData = PowerOfArrestOrderActionData;
        break;
      case "Amended, discharged or varied order (FL404B)":
        orderActionData = AmendDischargedVariedOrderActionData;
        break;
      case "Child arrangements, specific issue or prohibited steps order (C43)":
        orderActionData = ChildArrangementsOrderActionData;
        break;
      default:
        throw new Error(
          `Unexpected order type when fetching order data: ${orderType}`,
        );
    }

    await this.commonCaseEventsUtils.completeEvent({
      caseId: caseId,
      eventId: "manageOrders",
      eventData: this.getOrderData(orderActionData, isDraft, doServe),
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  private getOrderData(
    orderData: OrderActionData,
    isDraft: boolean,
    doServe: boolean,
  ) {
    if (isDraft) {
      return orderData.draftOrderData;
    } else if (!isDraft && !doServe) {
      return orderData.finalOrderData;
    } else {
      return orderData.createAndServeOrderData;
    }
  }
}
