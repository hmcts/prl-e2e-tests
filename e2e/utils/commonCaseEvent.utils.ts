import { APIRequestContext, APIResponse, request } from "@playwright/test";
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";
import { UserCredentials } from "../common/types.ts";

/**
 * Parameters for an event request.
 */
interface EventRequestParams {
  /** The case reference of the case. */
  caseId: string;
  /** The name of the event to be completed. */
  eventId: string;
  /** The JSON event request data. */
  eventData: Record<string, unknown>;
  /** The credentials of the user completing the request. */
  userCredentials: UserCredentials;
}

export class CommonCaseEventUtils {
  constructor(
    private serviceAuthUtils: ServiceAuthUtils,
    private idamUtils: IdamUtils,
  ) {}

  /**
   * Completes an entire API event.
   *
   * @param EventRequestParams the parameters of the event request.
   */
  async completeEvent({
    caseId,
    eventId,
    eventData,
    userCredentials,
  }: EventRequestParams): Promise<void> {
    const bearerToken: string = await this.getBearerToken(userCredentials);
    const serviceToken: string = await this.getServiceToken();
    const userDetails = await this.getUserDetails(userCredentials.email);
    const eventToken: string = await this.getEventToken(
      caseId,
      eventId,
      bearerToken,
      serviceToken,
      userDetails.id,
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
      userDetails.id,
    );
  }

  /**
   * Creates and submits an FL401 or C100 testing support solicitor case via API requests.
   *
   * @param caseId the case reference.
   * @param eventData The JSON event request data.
   * @param bearerToken the Authorization token for the user completing the event.
   * @param serviceToken the ServiceAuthorization token for the service the event is completing against.
   * @param userId the IDAM id of the user completing the event.
   */
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

  /**
   * Gets the event token required to complete an event via API requests.
   *
   * @param caseId the case reference.
   * @param eventId the name of the event to be completed.
   * @param bearerToken the Authorization token for the user completing the event.
   * @param serviceToken the ServiceAuthorization token for the service the event is completing against.
   * @param userId the IDAM id of the user completing the event.
   * @returns the event token.
   */
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

  /**
   * Gets the IDAM bearer token for a given user via API requests.
   *
   * @param userCredentials the credentials of the user requiring the bearer token.
   * @returns the bearer token.
   */
  async getBearerToken(userCredentials: UserCredentials): Promise<string> {
    return await this.idamUtils.generateIdamToken({
      grantType: "password",
      username: userCredentials.email,
      password: userCredentials.password,
      scope: "openid profile roles",
      clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
      clientSecret: process.env.IDAM_SECRET as string,
      redirectUri: process.env.MANAGE_CASE_REDIRECT_URI as string,
    });
  }

  /**
   * Gets the user details a given user email address via API requests.
   *
   * @param email the email address of the user for which the details will be fetched.
   * @returns a JSON object of user details.
   */
  async getUserDetails(email: string) {
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

    return await response.json();
  }

  /**
   * Gets the service token for a given service via API requests.
   *
   * @param microservice the name of the microservice for which the token is fetched for. Defaults to `"ccd_data"`.
   * @returns the service token.
   */
  async getServiceToken(microservice: string = "ccd_data"): Promise<string> {
    return await this.serviceAuthUtils.retrieveToken({
      microservice: microservice,
    });
  }

  /**
   * Creates a new API context to be used for making requests.
   */
  async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext();
  }

  /**
   * Gets the case data for a given case reference via API requests.
   *
   * @param caseId the case reference.
   * @returns a JSON object of the case data.
   */
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
