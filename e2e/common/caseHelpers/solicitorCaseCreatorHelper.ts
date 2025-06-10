import { Page } from "@playwright/test";
import process from "node:process";
import { PageFunction } from "playwright-core/types/structs";
import {
  solicitorCACaseAPIEvent,
  solicitorCaseCreateType,
  solicitorDACaseAPIEvent
} from "../types.ts";
import solicitorDACaseData from "../../caseData/solicitorDACaseEventData.json" with { type: "json" };
import solicitorDACaseDataDemo from "../../caseData/solicitorDACaseEventData-demo.json" with { type: "json" };
import orderEventDataAmendDischargedVariedDemo
  from "../../caseData/orderData/orderEventData-amendDischargedVaried-demo.json" with { type: "json" };
import orderEventDataAmendDischargedVaried
  from "../../caseData/orderData/orderEventData-amendDischargedVaried.json" with { type: "json" };
import orderEventDataPowerOfArrestDemo
  from "../../caseData/orderData/orderEventData-powerOfArrest-demo.json" with { type: "json" };
import orderEventDataPowerOfArrest
  from "../../caseData/orderData/orderEventData-powerOfArrest.json" with { type: "json" };
import solicitorCACaseDataDemo from "../../caseData/solicitorCACaseEventData-demo.json" with { type: "json" };
import solicitorCACaseData from "../../caseData/solicitorCACaseEventData.json" with { type: "json" };

// Using "any" type below because it represents a large JSON object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonData = Record<string, any>;
export let jsonDatas: JsonData;
if (process.env.MANAGE_CASES_TEST_ENV === "demo") {
  jsonDatas = {
    solicitorDACaseData: solicitorDACaseDataDemo,
    solicitorCACaseData: solicitorCACaseDataDemo,
    manageOrderDataPowerOfArrest: orderEventDataPowerOfArrestDemo,
    manageOrderDataAmendDischargedVaried:
    orderEventDataAmendDischargedVariedDemo
  };
} else {
  jsonDatas = {
    solicitorDACaseData: solicitorDACaseData,
    solicitorCACaseData: solicitorCACaseData,
    manageOrderDataPowerOfArrest: orderEventDataPowerOfArrest,
    manageOrderDataAmendDischargedVaried: orderEventDataAmendDischargedVaried
  };
}

/**
 * Function to get the token required for the event submission request
 * @param {Page} page the page to be used - this gives the API call its context
 * @param {string} url the url of the token request
 * @param {HeadersInit} headers the request headers
 * @returns {Promise<string>} the token to be used for an event submission request
 */
export async function getData(
  page: Page,
  url: string,
  headers: HeadersInit
): Promise<string> {
  return await retryEvaluate<string, { url: string; headers: HeadersInit }>(
    page,
    async ({ url, headers }) => {
      const res = await fetch(url, {
        method: "GET",
        headers,
        credentials: "same-origin"
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const json = await res.json();
      return json.event_token;
    },
    { url, headers }
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
export async function postData(
  page: Page,
  url: string,
  headers: HeadersInit,
  requestData: string
): Promise<string> {
  return await retryEvaluate<
    string,
    { url: string; headers: HeadersInit; requestData: string }
  >(
    page,
    async ({ url, headers, requestData }) => {
      const res = await fetch(url, {
        method: "POST",
        body: requestData,
        headers
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const json = await res.json();
      return json.id;
    },
    { url, headers, requestData }
  );
}

/**
 * Function to submit a specific event for a given case.
 * @param {Page} page the page to be used - this gives the API call its context
 * @param {string} caseId the ID of the case to perform the event against
 * @param {solicitorDACaseAPIEvent | solicitorCACaseAPIEvent} eventId the ID of the event to be submitted
 * @param {JsonData} jsonData a JSON file stored in an object that contains the event data for the event to be submitted
 */
export async function submitEvent(
  page: Page,
  caseId: string,
  eventId: solicitorDACaseAPIEvent | solicitorCACaseAPIEvent,
  jsonData: JsonData = jsonDatas.solicitorDACaseData
): Promise<void> {
  if (process.env.PWDEBUG) {
    console.log(`Start of event: ${eventId}`);
  }
  const eventData = jsonData[eventId].data;
  const startEventUrl = `/data/internal/cases/${caseId}/event-triggers/${eventId}?ignore-warning=false`;

  const startEventHeaders = {
    Accept:
      "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-event-trigger.v2+json;charset=UTF-8",
    Experimental: "true",
    "Content-type": "application/json; charset=UTF-8"
  };
  const eventToken: string = await getData(
    page,
    startEventUrl,
    startEventHeaders
  );

  const submitEventUrl = `/data/cases/${caseId}/events`;
  const data = {
    data: eventData,
    event: {
      id: eventId,
      summary: "",
      description: ""
    },
    event_token: eventToken,
    ignore_warning: false
  };
  const submitEventHeaders = {
    Accept:
      "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-event.v2+json;charset=UTF-8",
    Experimental: "true",
    "Content-type": "application/json; charset=UTF-8"
  };
  await postData(
    page,
    submitEventUrl,
    submitEventHeaders,
    JSON.stringify(data)
  );

  if (process.env.PWDEBUG) {
    console.log(`Completed event: ${eventId}`);
  }
}

export async function createBlankCase(
  page: Page,
  jsonData: JsonData
): Promise<string> {
  const startCaseCreationUrl = `/data/internal/case-types/PRLAPPS/event-triggers/solicitorCreate?ignore-warning=false`;

  const startCaseCreationHeaders = {
    Accept:
      "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8",
    Experimental: "true",
    "Content-type": "application/json; charset=UTF-8"
  };
  const eventToken: string = await getData(
    page,
    startCaseCreationUrl,
    startCaseCreationHeaders
  );

  const submitCaseUrl = `/data/case-types/PRLAPPS/cases?ignore-warning=false`;
  const data = {
    data: jsonData.solicitorCreate.data,
    draft_id: null,
    event: {
      id: "solicitorCreate",
      summary: "",
      description: ""
    },
    event_token: eventToken,
    ignore_warning: false
  };
  const submitEventHeaders = {
    Accept:
      "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8",
    Experimental: "true",
    "Content-type": "application/json; charset=UTF-8"
  };
  return await postData(
    page,
    submitCaseUrl,
    submitEventHeaders,
    JSON.stringify(data)
  );
}

export async function createTSSolicitorCase(
  page: Page,
  caseType: solicitorCaseCreateType
): Promise<string> {
  const startCaseCreationUrl = `/data/internal/case-types/PRLAPPS/event-triggers/testingSupportDummySolicitorCreate?ignore-warning=false`;

  const startCaseCreationHeaders = {
    Accept:
      "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8",
    Experimental: "true",
    "Content-type": "application/json; charset=UTF-8"
  };
  const eventToken: string = await getData(
    page,
    startCaseCreationUrl,
    startCaseCreationHeaders
  );

  const submitCaseUrl = `/data/case-types/PRLAPPS/cases?ignore-warning=false`;
  const data = {
    data: {
      caseTypeOfApplication: caseType,
      applicantOrganisationPolicy: null,
      applicantCaseName: "TEST"
    },
    draft_id: null,
    event: {
      id: "testingSupportDummySolicitorCreate",
      summary: "",
      description: ""
    },
    event_token: eventToken,
    ignore_warning: false
  };
  const submitEventHeaders = {
    Accept:
      "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8",
    Experimental: "true",
    "Content-type": "application/json; charset=UTF-8"
  };
  return await postData(
    page,
    submitCaseUrl,
    submitEventHeaders,
    JSON.stringify(data)
  );
}

async function retryEvaluate<T, A>(
  page: Page,
  fn: PageFunction<A, T>, //fn: (arg: A) => Promise<T>,
  arg: A,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await page.evaluate(fn, arg);
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          `Page evaluate failed on final attempt (attempt ${attempt})`
        );
        throw error;
      }
      console.warn(
        `Page evaluate failed (attempt ${attempt}), with ${error}, retrying in ${delay}ms`
      );
    }
  }
  throw new Error("Unexpected error occurred");
}
