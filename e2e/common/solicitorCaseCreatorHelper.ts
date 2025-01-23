import solicitorCaseData from "../caseData/solicitorDACaseEventData.json";
import manageOrderEventDataAmendDischargedVaried from "../caseData/orderData/manageOrderEventData-amendDischargedVaried.json";
import manageOrderEventDataPowerOfArrest from "../caseData/orderData/manageOrderEventData-powerOfArrest.json";
import { Page } from "@playwright/test";
import { CaseAPIEvent } from "./types.ts";

// Using "any" type below because it represents a large JSON object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonData = Record<string, any>;
export const jsonDatas: JsonData = {
  defaultData: solicitorCaseData,
  manageOrderDataPowerOfArrest: manageOrderEventDataPowerOfArrest,
  manageOrderDataAmendDischargedVaried:
    manageOrderEventDataAmendDischargedVaried,
};

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
  headers: HeadersInit,
): Promise<string> {
  return await page.evaluate(
    async ({ url, headers }) => {
      const getRes = await fetch(url, {
        method: "GET",
        headers,
        credentials: "same-origin",
      });
      const resBody = await getRes.json();
      if (resBody) {
        return resBody.event_token;
      }
    },
    { url, headers },
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
  requestData: string,
): Promise<string> {
  return await page.evaluate(
    async ({ url, headers, requestData }) => {
      const postRes = await fetch(url, {
        method: "POST",
        body: requestData,
        headers,
      });
      const resBody = await postRes.json();
      if (resBody) {
        return resBody.id;
      }
    },
    { url, headers, requestData },
  );
}

/**
 * Function to submit a specific event for a given case.
 * @param {Page} page the page to be used - this gives the API call its context
 * @param {string} caseId the ID of the case to perform the event against
 * @param {CaseAPIEvent} eventId the ID of the event to be submitted
 * @param {JsonData} jsonData a JSON file stored in an object that contains the event data for the event to be submitted
 */
export async function submitEvent(
  page: Page,
  caseId: string,
  eventId: CaseAPIEvent,
  jsonData: JsonData = jsonDatas.defaultData,
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
    "Content-type": "application/json; charset=UTF-8",
  };
  const eventToken: string = await getData(
    page,
    startEventUrl,
    startEventHeaders,
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
    Experimental: "true",
    "Content-type": "application/json; charset=UTF-8",
  };
  await postData(
    page,
    submitEventUrl,
    submitEventHeaders,
    JSON.stringify(data),
  );

  if (process.env.PWDEBUG) {
    console.log(`Completed event: ${eventId}`);
  }
}
