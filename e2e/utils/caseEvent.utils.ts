import { Page } from "@playwright/test";
import {
  solicitorCACaseAPIEvent,
  solicitorDACaseAPIEvent,
} from "../common/types.js";
import Config from "./config.utils.js";
import {
  c100Events,
  fl401Events,
} from "../testData/jsonRequestData/solicitorIndividualEventsData.js";

/**
 * @deprecated Use the new `manageCaseEvent.utils.ts` class instead.
 */
export class CaseEventUtils {
  private readonly contentTypeHeader: string;
  private readonly experimentalHeader: string;

  constructor() {
    this.contentTypeHeader = "application/json; charset=UTF-8";
    this.experimentalHeader = "true";
  }

  async createCACaseSubmitAndPayIndividualEvents(page: Page): Promise<string> {
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

    await page.goto(Config.manageCasesBaseURL);
    const caseRef = await this.createBlankCase(page, c100Events);
    for (const event of solicitorCaseEvents) {
      await this.submitEvent(page, caseRef, event, c100Events);
    }
    return caseRef;
  }

  async createDACaseSubmitAndPayIndividualEvents(page: Page): Promise<string> {
    const solicitorCaseEvents: solicitorDACaseAPIEvent[] = [
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
    ];

    await page.goto(Config.manageCasesBaseURL);
    const caseRef = await this.createBlankCase(page, fl401Events);
    for (const event of solicitorCaseEvents) {
      await this.submitEvent(page, caseRef, event, fl401Events);
    }
    return caseRef;
  }

  /**
   * Function to submit a specific event for a given case.
   * @param {Page} page the page to be used - this gives the API call its context
   * @param {string} caseId the ID of the case to perform the event against
   * @param {solicitorDACaseAPIEvent | solicitorCACaseAPIEvent} eventId the ID of the event to be submitted
   * @param jsonData JSON file stored in an object that contains the event data for the event to be submitted
   */
  async submitEvent(
    page: Page,
    caseId: string,
    eventId: solicitorDACaseAPIEvent | solicitorCACaseAPIEvent,
    jsonData,
  ): Promise<void> {
    try {
      if (process.env.PWDEBUG) {
        console.log(`Start of event: ${eventId}`);
      }
      const eventData = jsonData[eventId].data;
      const startEventUrl = `/data/internal/cases/${caseId}/event-triggers/${eventId}?ignore-warning=false`;

      const startEventHeaders = {
        Accept:
          "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8",
        Experimental: this.experimentalHeader,
        "Content-type": this.contentTypeHeader,
      };
      const eventToken: string = await this.getData(
        page,
        startEventUrl,
        startEventHeaders,
        `getData for event: ${eventId}`,
      );

      const submitEventUrl = `/data/cases/${caseId}/events`;
      const data = {
        data: eventData,
        event: {
          id: eventId,
          summary: "",
          description: "",
        },
        event_token: eventToken,
        ignore_warning: false,
      };
      const submitEventHeaders = {
        Accept:
          "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json;charset=UTF-8",
        Experimental: this.experimentalHeader,
        "Content-type": this.contentTypeHeader,
      };
      await this.postData(
        page,
        submitEventUrl,
        submitEventHeaders,
        JSON.stringify(data),
        `postData for event: ${eventId}`,
      );

      if (process.env.PWDEBUG) {
        console.log(`Completed event: ${eventId}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to submit event ${eventId} for case ${caseId}: ${error.message}`,
      );
    }
  }

  private async createBlankCase(page: Page, jsonData): Promise<string> {
    try {
      const startCaseCreationUrl = `/data/internal/case-types/PRLAPPS/event-triggers/solicitorCreate?ignore-warning=false`;

      const startCaseCreationHeaders = {
        Accept:
          "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8",
        Experimental: this.experimentalHeader,
        "Content-type": this.contentTypeHeader,
      };
      const eventToken: string = await this.getData(
        page,
        startCaseCreationUrl,
        startCaseCreationHeaders,
        "getData for event: solicitorCreate",
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
        Experimental: this.experimentalHeader,
        "Content-type": this.contentTypeHeader,
      };
      return await this.postData(
        page,
        submitCaseUrl,
        submitEventHeaders,
        JSON.stringify(data),
        "postData for event: solicitorCreate",
      );
    } catch (error) {
      throw new Error(`Failed to create blank case: ${error.message}`);
    }
  }

  /**
   * Function to get the token required for the event submission request
   * @param {Page} page the page to be used - this gives the API call its context
   * @param {string} url the url of the token request
   * @param {HeadersInit} headers the request headers
   * @returns {Promise<string>} the token to be used for an event submission request
   */
  private async getData(
    page: Page,
    url: string,
    headers: HeadersInit,
    description: string = "getData",
  ): Promise<string> {
    return await this.retryEvaluate<
      string,
      { url: string; headers: HeadersInit }
    >(
      page,
      async ({ url, headers }) => {
        const res = await fetch(url, {
          method: "GET",
          headers,
          credentials: "same-origin",
        });
        if (!res.ok) {
          const errorBody = await res.text();
          let errorMessage = `HTTP error ${res.status}`;
          try {
            const json = JSON.parse(errorBody);
            if (json.callbackErrors && json.callbackErrors.length > 0) {
              errorMessage += ` - CALLBACK ERRORS: ${json.callbackErrors.join(", ")}`;
            }
            errorMessage += `\nResponse Body:\n${JSON.stringify(json, null, 2)}`;
          } catch {
            errorMessage += `: ${errorBody}`;
          }
          throw new Error(errorMessage);
        }
        const json = await res.json();
        return json.event_token;
      },
      { url, headers },
      3,
      1000,
      description,
    );
  }

  /**
   * Function to post the event data of an event
   * @param {Page} page the page to be used - this gives the API call its context
   * @param {string} url the url of the event request
   * @param {HeadersInit} headers the request headers
   * @param {string} requestData the data required for the request
   * @returns {Promise<string>} the case reference
   */
  private async postData(
    page: Page,
    url: string,
    headers: HeadersInit,
    requestData: string,
    description: string = "postData",
  ): Promise<string> {
    return await this.retryEvaluate<
      string,
      { url: string; headers: HeadersInit; requestData: string }
    >(
      page,
      async ({ url, headers, requestData }) => {
        const res = await fetch(url, {
          method: "POST",
          body: requestData,
          headers,
        });
        if (!res.ok) {
          const errorBody = await res.text();
          let errorMessage = `HTTP error ${res.status}`;
          try {
            const json = JSON.parse(errorBody);
            if (json.callbackErrors && json.callbackErrors.length > 0) {
              errorMessage += ` - CALLBACK ERRORS: ${json.callbackErrors.join(", ")}`;
            }
            errorMessage += `\nResponse Body:\n${JSON.stringify(json, null, 2)}`;
          } catch {
            errorMessage += `: ${errorBody}`;
          }
          throw new Error(errorMessage);
        }
        const json = await res.json();
        return json.id;
      },
      { url, headers, requestData },
      3,
      1000,
      description,
    );
  }

  private async retryEvaluate<T, A>(
    page: Page,
    fn: (arg: never) => T | Promise<T>,
    arg: A,
    maxRetries: number = 3,
    delay: number = 1000,
    description: string = "evaluate",
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await page.evaluate(fn, arg);
      } catch (error) {
        // Immediate failure for non-retryable HTTP errors (4xx except 408/429), including on the first try.
        const isNonRetryable = /HTTP error 4(?!08|29)\d{2}/.test(error.message);

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
          `${description} failed (attempt ${attempt}), with ${error.message}, retrying in ${delay}ms`,
        );
        await page.waitForTimeout(delay);
      }
    }
    throw new Error(
      `${description} failed unexpectedly after ${maxRetries} attempts`,
    );
  }
}
