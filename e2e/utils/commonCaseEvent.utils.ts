import { APIRequestContext, APIResponse, request } from "@playwright/test";
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";

interface EventRequestParams {
  caseId: string;
  eventId: string;
  eventData: Record<string, unknown>;
  userInfo: UserInfo;
}

export interface UserInfo {
  email: string;
  password: string;
}

export class CommonCaseEventUtils {
  constructor(
    private serviceAuthUtils: ServiceAuthUtils,
    private idamUtils: IdamUtils,
  ) {}

  async completeEvent({
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

  async getEventToken(
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

  async getBearerToken(userInfo: UserInfo): Promise<string> {
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

  async getServiceToken(microservice: string = "ccd_data"): Promise<string> {
    return await this.serviceAuthUtils.retrieveToken({
      microservice: microservice,
    });
  }

  async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext();
  }

  async getCaseInfo(caseId: string) {
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

  async retry<T>(fn: () => Promise<T>, retries = 3, delayMs = 500): Promise<T> {
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
