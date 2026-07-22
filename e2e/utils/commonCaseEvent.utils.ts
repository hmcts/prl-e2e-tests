import { APIRequestContext, request } from "@playwright/test";
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";
import { UserCredentials } from "../common/types.ts";

/**
 * Parameters for an event request.
 */
interface EventRequestParams {
  /** The case reference of the case. */
  caseRef: string;
  /** The name of the event to be completed. */
  eventId: string;
  /** The JSON event request data. */
  eventData: Record<string, unknown>;
  /** The credentials of the user completing the request. */
  userCredentials: UserCredentials;
}

interface RetryOptions<T> {
  fn: () => Promise<T>;
  maxRetries?: number;
  delayMs?: number;
  description?: string;
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
    caseRef,
    eventId,
    eventData,
    userCredentials,
  }: EventRequestParams): Promise<void> {
    if (process.env.PWDEBUG) {
      console.log("Starting event:", eventId);
    }
    const bearerToken: string = await this.getBearerToken(userCredentials);
    const serviceToken: string = await this.getServiceToken();
    const userDetails = await this.getUserDetails(userCredentials.email);
    const eventToken: string = await this.getEventToken(
      caseRef,
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
      caseRef,
      JSON.stringify({ ...eventData, ...eventJson }),
      bearerToken,
      serviceToken,
      userDetails.id,
      eventId,
    );

    if (process.env.PWDEBUG) {
      console.log("Completed event", eventId);
    }
  }

  /**
   * Creates and submits an FL401 or C100 testing support solicitor case via API requests.
   *
   * @param caseRef the case reference.
   * @param eventData The JSON event request data.
   * @param bearerToken the Authorization token for the user completing the event.
   * @param serviceToken the ServiceAuthorization token for the service the event is completing against.
   * @param userId the IDAM id of the user completing the event.
   * @param eventId the ID of the event being submitted.
   */
  private async submitEvent(
    caseRef: string,
    eventData: string,
    bearerToken: string,
    serviceToken: string,
    userId: string,
    eventId: string,
  ): Promise<void> {
    await this.retry({
      fn: async () =>
        this.withApiContext(async (api) => {
          const submitEventUrl =
            `${process.env.CCD_DATA_STORE_URL}/caseworkers/${userId}` +
            `/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases/${caseRef}/events`;

          const response = await api.post(submitEventUrl, {
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
              `HTTP ${response.status()} -> Failed to submit ${eventId} event: ${await response.text()}`,
            );
          }
        }),
      description: `Submit ${eventId} event`,
    });
  }

  /**
   * Gets the event token required to complete an event via API requests.
   *
   * @param caseRef the case reference.
   * @param eventId the name of the event to be completed.
   * @param bearerToken the Authorization token for the user completing the event.
   * @param serviceToken the ServiceAuthorization token for the service the event is completing against.
   * @param userId the IDAM id of the user completing the event.
   * @returns the event token.
   */
  async getEventToken(
    caseRef: string,
    eventId: string,
    bearerToken: string,
    serviceToken: string,
    userId: string,
  ): Promise<string> {
    return this.withApiContext(async (api) => {
      const eventTokenUrl =
        `${process.env.CCD_DATA_STORE_URL}/caseworkers/${userId}` +
        `/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases/${caseRef}` +
        `/event-triggers/${eventId}/token`;

      const response = await api.get(eventTokenUrl, {
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

      const { token } = await response.json();
      return token;
    });
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

    return this.withApiContext(async (api) => {
      const url = `${process.env.IDAM_TESTING_SUPPORT_USERS_URL}?email=${email}`;

      const response = await api.get(url, {
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

      return response.json();
    });
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
   * Gets the case data for a given case reference via API requests.
   *
   * @param caseRef the case reference.
   * @returns a JSON object of the case data.
   */
  async getCaseInfo(caseRef: string) {
    const bearerToken = await this.getBearerToken({
      email: process.env.CCD_DATA_STORE_CLIENT_USERNAME!,
      password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD!,
    });

    return this.retry({
      fn: async () =>
        this.withApiContext(async (apiContext) => {
          const serviceToken = await this.getServiceToken("prl_cos_api");

          const response = await apiContext.get(
            `${process.env.CCD_DATA_STORE_URL}/cases/${caseRef}`,
            {
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                ServiceAuthorization: `Bearer ${serviceToken}`,
                Experimental: "true",
              },
            },
          );

          if (!response.ok()) {
            throw new Error(
              `HTTP ${response.status()} -> Failed to get case info: ${await response.text()}`,
            );
          }

          return response.json();
        }),
      description: "getCaseInfo",
    });
  }

  async retry<T>({
    fn,
    maxRetries = 3,
    delayMs = 500,
    description = "",
  }: RetryOptions<T>): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        // Immediate failure for non-retryable HTTP errors (4xx except 408/409/429), including on the first try.
        const isNonRetryable = /HTTP error 4(?!08|29|09)\d{2}/.test(
          error.message,
        );

        if (isNonRetryable) {
          const detailedError = `${description} failed with a non-retryable error on attempt ${attempt}: ${error.message}. This is a non-retryable error and likely needs a code/payload fix.`;
          console.error(detailedError);
          throw new Error(detailedError);
        }

        if (attempt === maxRetries) {
          console.error(
            `${description} failed on final attempt (attempt ${attempt}): ${error.message}`,
          );
          throw error;
        }

        console.warn(
          `${description} failed (attempt ${attempt}), with ${error.message}, retrying in ${delayMs}ms`,
        );

        if (attempt < maxRetries) {
          await new Promise((res) => setTimeout(res, delayMs * attempt));
        }
      }
    }

    throw new Error(
      `${description} failed unexpectedly after ${maxRetries} attempts`,
    );
  }

  async withApiContext<T>(
    fn: (apiContext: APIRequestContext) => Promise<T>,
  ): Promise<T> {
    const apiContext = await request.newContext();

    try {
      return await fn(apiContext);
    } finally {
      await apiContext.dispose();
    }
  }
}
