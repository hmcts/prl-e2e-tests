import process from "node:process";
import solicitorCaseData from "../caseData/solicitorDACaseData.json";
import { Page } from "@playwright/test";

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

export async function submitEvent(
  page: Page,
  caseId: string,
  eventId: string,
): Promise<void> {
  if (process.env.PWDEBUG) {
    console.log(`Start of event: ${eventId}`);
  }
  // @ts-expect-error - caseEvent will always map to its associated json object
  const eventData = solicitorCaseData[eventId].data;
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
  let data = {
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
