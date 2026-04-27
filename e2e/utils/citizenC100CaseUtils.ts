import { APIRequestContext, APIResponse, request } from "@playwright/test";
import json from "../caseData/citizenCA/c100-citizen-dummy-case-details.json" with { type: "json" };
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";
import {
  buildSOAEventData,
  issueAndSendToLocalCourtEventData,
  manageOrdersEventData,
  sendToGatekeeperEventData,
} from "../testData/citizen.js";

type JsonObjectWithId = {
  id: string;
  [key: string]: unknown;
};

interface UserInfo {
  email: string;
  password: string;
}

interface EventRequestParams {
  caseId: string;
  eventId: string;
  eventData: Record<string, unknown>;
  userInfo: UserInfo;
}

export interface CitizenApplicationInfo {
  orderId: string;
  applicant1Id: string;
  applicant2Id: string;
  respondent1Id: string;
  respondent2Id: string;
  otherPartyId: string;
}

export interface CaseFlagInfo {
  caseFlagName: string;
  status: string;
  partyName: string;
}

export interface CitizenUploadedDocument {
  uploader: string;
  category: string;
  fileName: string;
}

export class CitizenC100CaseUtils {
  constructor(
    private serviceAuthUtils: ServiceAuthUtils,
    private idamUtils: IdamUtils,
  ) {}

  public async setupCitizenC100Application(
    userInfo: UserInfo,
  ): Promise<string> {
    const caseId = await this.createAndSubmitCitizenCase(userInfo);
    await this.issueAndSendToLocalCourt(caseId);
    await this.sendToGatekeeper(caseId);
    await this.manageOrdersCreateOrder(caseId);
    await this.serviceOfApplication(caseId);
    return caseId;
  }

  public async createAndSubmitCitizenCase(userInfo: UserInfo): Promise<string> {
    // get IDAM citizen user token
    const bearerToken: string = await this.idamUtils.generateIdamToken({
      grantType: "password",
      username: userInfo.email,
      password: userInfo.password,
      scope: "openid profile roles",
      clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
      clientSecret: process.env.IDAM_SECRET as string,
      redirectUri: process.env.MANAGE_CASE_REDIRECT_URI as string,
    });

    // get S2S token
    const s2sToken: string = await this.serviceAuthUtils.retrieveToken({
      microservice: "ccd_data",
    });
    const createdCaseJsonData: JsonObjectWithId = await this.createDraftCase(
      bearerToken,
      s2sToken,
    );

    // get case number from created case data
    const caseNumber: string = String(createdCaseJsonData.id);
    if (!caseNumber) {
      throw new Error("Failed to retrieve CCD case reference");
    }

    await this.submitCitizenCase(
      caseNumber,
      createdCaseJsonData,
      bearerToken,
      s2sToken,
    );
    return caseNumber;
  }

  private async createDraftCase(
    bearerToken: string,
    s2sToken: string,
  ): Promise<JsonObjectWithId> {
    let response: APIResponse;

    await this.retry(async () => {
      const apiContext = await this.createApiContext();
      const caseData = json;
      const urlCreateCase = `${process.env.PRL_COS_API_URL as string}/testing-support/create-dummy-citizen-case-with-body`;
      response = await apiContext.post(urlCreateCase, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ServiceAuthorization: `Bearer ${s2sToken}`,
          "Content-Type": "application/json",
        },
        data: caseData,
      });

      if (!response.ok()) {
        throw new Error(
          `Failed to create case: ${response.status()} - ${await response.text()}`,
        );
      }
    });

    return await response.json();
  }

  private async submitCitizenCase(
    caseNumber: string,
    caseData: JsonObjectWithId,
    bearerToken: string,
    s2sToken: string,
  ): Promise<void> {
    await this.retry(async () => {
      const apiContext = await this.createApiContext();
      const urlSubmitCase = `${process.env.PRL_COS_API_URL as string}/citizen/${caseNumber}/citizen-case-submit/submit-c100-application`;
      const responseCreateCase = await apiContext.post(urlSubmitCase, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ServiceAuthorization: `Bearer ${s2sToken}`,
          "Content-Type": "application/json",
        },
        data: caseData,
      });

      if (!responseCreateCase.ok()) {
        throw new Error(
          `Failed to submit case: ${responseCreateCase.status()} - ${await responseCreateCase.text()}`,
        );
      }
    });
  }

  public async issueAndSendToLocalCourt(caseId: string): Promise<void> {
    await this.completeEvent({
      caseId: caseId,
      eventId: "issueAndSendToLocalCourtCallback",
      eventData: issueAndSendToLocalCourtEventData,
      userInfo: {
        email: process.env.COURT_ADMIN_STOKE_USERNAME as string,
        password: process.env.COURT_ADMIN_STOKE_PASSWORD as string,
      },
    });
  }

  public async sendToGatekeeper(caseId: string): Promise<void> {
    await this.completeEvent({
      caseId: caseId,
      eventId: "sendToGateKeeper",
      eventData: sendToGatekeeperEventData,
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  public async manageOrdersCreateOrder(caseId: string): Promise<void> {
    await this.completeEvent({
      caseId: caseId,
      eventId: "manageOrders",
      eventData: manageOrdersEventData,
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  public async serviceOfApplication(caseId: string): Promise<void> {
    // get order and party ID's from case data and insert into json object
    const jsonCaseData = await this.getCaseInfo(caseId);
    const citizenSOACaseInfo: CitizenApplicationInfo = {
      orderId: jsonCaseData.data.orderCollection[0].id,
      applicant1Id: jsonCaseData.data.applicants[1].id,
      applicant2Id: jsonCaseData.data.applicants[0].id,
      respondent1Id: jsonCaseData.data.respondents[0].id,
      respondent2Id: jsonCaseData.data.respondents[1].id,
      otherPartyId: jsonCaseData.data.otherPartyInTheCaseRevised[0].id,
    };
    const eventData = buildSOAEventData(citizenSOACaseInfo);
    await this.completeEvent({
      caseId: caseId,
      eventId: "serviceOfApplication",
      eventData: eventData,
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  public async fetchCitizenCreatedCaseFlags(
    caseId: string,
    isApplicant: boolean,
  ): Promise<CaseFlagInfo> {
    const jsonCaseData = await this.getCaseInfo(caseId);
    const jsonCaseFlags = isApplicant
      ? jsonCaseData.data.caApplicant1ExternalFlags
      : jsonCaseData.data.caRespondent1ExternalFlags;
    return {
      caseFlagName: jsonCaseFlags.details[0].value.name,
      status: jsonCaseFlags.details[0].value.status,
      partyName: jsonCaseFlags.partyName,
    };
  }

  public async fetchCitizenUploadedDocuments(
    caseId: string,
  ): Promise<CitizenUploadedDocument> {
    const jsonCaseData = await this.getCaseInfo(caseId);
    return {
      uploader: jsonCaseData.data.citizenQuarantineDocsList[0].value.uploadedBy,
      category:
        jsonCaseData.data.citizenQuarantineDocsList[0].value.categoryName,
      fileName:
        jsonCaseData.data.citizenQuarantineDocsList[0].value
          .citizenQuarantineDocument.document_filename,
    };
  }

  private async getCaseInfo(caseId: string) {
    const bearerToken: string = await this.getBearerToken({
      email: process.env.CCD_DATA_STORE_CLIENT_USERNAME as string,
      password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD as string,
    });
    let response: APIResponse;

    await this.retry(async () => {
      const serviceToken: string = await this.getServiceToken("prl_cos_api");

      const apiContext = await this.createApiContext();
      const url = `${process.env.CCD_DATA_STORE_URL as string}/cases/${caseId}`;
      response = await apiContext.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ServiceAuthorization: `Bearer ${serviceToken}`,
          Experimental: "true",
        },
      });

      if (!response.ok()) {
        throw new Error(
          `Failed to get case info: ${response.status()} - ${await response.text()}`,
        );
      }
    });

    return await response.json();
  }

  private async completeEvent({
    caseId,
    eventId,
    eventData,
    userInfo,
  }: EventRequestParams): Promise<void> {
    const bearerToken: string = await this.getBearerToken(userInfo);
    const serviceToken: string = await this.getServiceToken();
    const userId: string = await this.getUserId(userInfo.email);
    const eventToken: string = await this.getEventToken(
      caseId,
      eventId,
      bearerToken,
      serviceToken,
      userId,
    );

    // append the end of the event json because it is always the same apart from the eventId and eventToken
    const eventJson = {
      event: {
        id: eventId,
        summary: "",
        description: "",
      },
      event_token: eventToken,
      ignore_warning: false,
    };

    await this.submitEvent(
      caseId,
      JSON.stringify({ ...eventData, ...eventJson }),
      bearerToken,
      serviceToken,
      userId,
    );
  }

  private async submitEvent(
    caseId: string,
    eventData: string,
    bearerToken: string,
    serviceToken: string,
    userId: string,
  ): Promise<void> {
    await this.retry(async () => {
      const apiContext = await this.createApiContext();
      const submitEventUrl = `${process.env.CCD_DATA_STORE_URL as string}/caseworkers/${userId}/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases/${caseId}/events`;
      const response = await apiContext.post(submitEventUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ServiceAuthorization: `Bearer ${serviceToken}`,
          "Content-Type": "application/json; charset=UTF-8",
          Experimental: "true",
        },
        data: eventData,
      });

      if (!response.ok()) {
        throw new Error(
          `Failed to submit event: ${response.status()} - ${await response.text()}`,
        );
      }
    });
  }

  private async getEventToken(
    caseId: string,
    eventId: string,
    bearerToken: string,
    serviceToken: string,
    userId: string,
  ): Promise<string> {
    const apiContext = await this.createApiContext();
    const eventTokenUrl = `${process.env.CCD_DATA_STORE_URL as string}/caseworkers/${userId}/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases/${caseId}/event-triggers/${eventId}/token`;
    const response = await apiContext.get(eventTokenUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        ServiceAuthorization: `Bearer ${serviceToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok()) {
      throw new Error(
        `Failed to get event token: ${response.status()} - ${await response.text()}`,
      );
    }

    const responseJson = await response.json();
    return responseJson.token;
  }

  private async getBearerToken(userInfo: UserInfo): Promise<string> {
    return await this.idamUtils.generateIdamToken({
      grantType: "password",
      username: userInfo.email,
      password: userInfo.password,
      scope: "openid profile roles",
      clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
      clientSecret: process.env.IDAM_SECRET as string,
      redirectUri: process.env.MANAGE_CASE_REDIRECT_URI as string,
    });
  }

  private async getUserId(email: string): Promise<string> {
    const bearerToken = await this.getBearerToken({
      email: process.env.CCD_DATA_STORE_CLIENT_USERNAME,
      password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD,
    });

    const apiContext = await this.createApiContext();
    const eventTokenUrl = `${process.env.IDAM_TESTING_SUPPORT_USERS_URL as string}?email=${email}`;
    const response = await apiContext.get(eventTokenUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok()) {
      throw new Error(
        `Failed to get user ID: ${response.status()} - ${await response.text()}`,
      );
    }

    const responseJson = await response.json();
    return responseJson.id;
  }

  private async getServiceToken(
    microservice: string = "ccd_data",
  ): Promise<string> {
    return await this.serviceAuthUtils.retrieveToken({
      microservice: microservice,
    });
  }

  private async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext();
  }

  private async retry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delayMs = 500,
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;

        if (attempt < retries) {
          await new Promise((res) => setTimeout(res, delayMs * attempt));
        }
      }
    }

    throw lastError;
  }
}
