import { APIRequestContext, Browser, Page, request } from "@playwright/test";
import fs from "fs";
import process from "node:process";
import { ServiceOfApplicationLite } from "../../journeys/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationLite.ts";
import config from "../../utils/config.utils.ts";
import { Helpers } from "../helpers.ts";
import { TokenUtils } from "../../utils/token.utils.ts";
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";

const solicitorCaseData = JSON.parse(
  fs.readFileSync("./e2e/caseData/solicitorDACaseEventData.json", "utf8"),
);

/**
 * Function to create a blank DA Solicitor case.
 * @param {APIRequestContext} apiContext api context required to make the API requests
 * @param {string} bearerToken token required for Authorization of the API requests
 * @param {string} s2sToken token required for Service Authorization of the API requests
 * @returns {Promise<{ userID: string; caseRef: string }} an object containing the userID for the user email provided and
 * the caseID of the blank case that is created if successful.
 */
export async function createBlankCase(
  apiContext: APIRequestContext,
  bearerToken: string,
  s2sToken: string,
): Promise<{ userID: string; caseRef: string }> {
  let caseID: string;
  const userID: string = await getUserID(apiContext, bearerToken);
  const eventToken: string = await getEventToken(
    apiContext,
    bearerToken,
    s2sToken,
    userID,
    "solicitorCreate",
  );
  const jsonData = solicitorCaseData.solicitorCreate.data;
  const response = await apiContext.post(`${getUrlPrefix(userID)}/cases/`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
      ServiceAuthorization: `Bearer ${s2sToken}`,
    },
    data: {
      data: jsonData,
      event: {
        id: "solicitorCreate",
        summary: "test",
        description: "test",
      },
      event_token: `${eventToken}`,
      ignore_warning: false,
      draft_id: null,
    },
  });
  if (response.ok()) {
    const responseBody = await response.json();
    if (responseBody) {
      caseID = responseBody.id;
    } else {
      throw new Error("Failed to create case");
    }
  } else {
    throw new Error(
      `Failed to create case: ${response.status()} - ${response.statusText()}`,
    );
  }
  return { userID: userID, caseRef: caseID };
}

/**
 * Function to complete a case event with supplied API context
 * @param {APIRequestContext} apiContext api context required to make the API requests
 * @param {string} bearerToken token required for Authorization of the API requests
 * @param {string} s2sToken token required for Service Authorization of the API requests
 * @param {string} userID user ID of the user that is requesting the event token
 * @param {string} caseEvent the ID of the case event
 * @param {string} caseRef the ID of the case
 */
export async function completeCaseEventWithContext(
  apiContext: APIRequestContext,
  bearerToken: string,
  s2sToken: string,
  userID: string,
  caseEvent: string,
  caseRef: string,
): Promise<void> {
  const caseEventToken: string = await getEventToken(
    apiContext,
    bearerToken,
    s2sToken,
    userID,
    caseEvent,
    caseRef,
  );
  await actionCaseEvent(
    apiContext,
    bearerToken,
    s2sToken,
    userID,
    caseRef,
    caseEvent,
    caseEventToken,
  );
}

/**
 * Function to complete a case event with supplied API context - for use when calling one-off events on a given case
 * @param {string} caseRef the ID of the case
 * @param {string} caseEvent the ID of the case event
 */
export async function completeCaseEventWithoutContext(
  caseRef: string,
  caseEvent: string,
) {
  const apiContext: APIRequestContext = await request.newContext();
  const newTokenUtil = await new TokenUtils(new IdamUtils());
  const bearerToken = await newTokenUtil.getAccessToken("solicitorCreateCase");
  if (!bearerToken) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  const microservice: string = "prl_cos_api";
  const newServiceAuthUtil = await new ServiceAuthUtils()
  const s2sToken: string = await newServiceAuthUtil.retrieveToken({ microservice: microservice });
  const userID: string = await getUserID(apiContext, bearerToken);
  const caseEventToken: string = await getEventToken(
    apiContext,
    bearerToken,
    s2sToken,
    userID,
    caseEvent,
    caseRef,
  );
  await actionCaseEvent(
    apiContext,
    bearerToken,
    s2sToken,
    userID,
    caseRef,
    caseEvent,
    caseEventToken,
  );
}

/**
 * Function to retrieve the event for a given event ID.
 * @param {APIRequestContext} apiContext api context required to make the API requests
 * @param {string} bearerToken token required for Authorization of the API requests
 * @param {string} s2sToken token required for Service Authorization of the API requests
 * @param {string} userID user ID of the user that is requesting the event token
 * @param {string} caseEvent the ID of the case event
 * @param {string} caseID the ID of the case
 * @returns {Promise<string>} the event token for the given event
 */
export async function getEventToken(
  apiContext: APIRequestContext,
  bearerToken: string,
  s2sToken: string,
  userID: string,
  caseEvent: string,
  caseID: string = "",
): Promise<string> {
  let eventToken: string = "";
  const url: string =
    caseEvent === "solicitorCreate"
      ? `${getUrlPrefix(userID)}/event-triggers/solicitorCreate/token`
      : `${getUrlPrefix(userID)}/cases/${caseID}/event-triggers/${caseEvent}/token`;
  const response = await apiContext.get(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
      ServiceAuthorization: `Bearer ${s2sToken}`,
    },
  });
  if (response.ok()) {
    const responseBody = await response.json();
    if (responseBody) {
      eventToken = responseBody.token;
    } else {
      throw new Error("Failed to get event token");
    }
  } else {
    throw new Error(
      `Failed to get event token for event: ${caseEvent}: Received the following response: ${response.status()} - ${response.statusText()}`,
    );
  }
  return eventToken;
}

/**
 * Function to retrieve the event for a given event ID.
 * @param {APIRequestContext} apiContext api context required to make the API requests
 * @param {string} bearerToken token required for Authorization of the API requests
 * @param {string} s2sToken token required for Service Authorization of the API requests
 * @param {string} userID user ID of the user that is requesting the event token
 * @param {string} caseID the ID of the case
 * @param {string} caseEvent the ID of the case event
 * @param {string} caseEventToken the event token retrieved for the given case event
 */
async function actionCaseEvent(
  apiContext: APIRequestContext,
  bearerToken: string,
  s2sToken: string,
  userID: string,
  caseID: string,
  caseEvent: string,
  caseEventToken: string,
): Promise<void> {
  try {
    const jsonData = solicitorCaseData[caseEvent].data;
    await apiContext.post(`${getUrlPrefix(userID)}/cases/${caseID}/events`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        ServiceAuthorization: `Bearer ${s2sToken}`,
        Experimental: "true",
      },
      data: {
        data: jsonData,
        event: {
          id: `${caseEvent}`,
          summary: "",
          description: "",
        },
        event_token: `${caseEventToken}`,
        ignore_warning: false,
      },
    });
  } catch (error) {
    throw new Error(
      `Error executing the following event: ${caseEvent}. Received the following error: ${error instanceof Error ? error.message : error}`,
    );
  }
}

/**
 * Function to retrieve the userID for a given user.
 * @param {APIRequestContext} apiContext api context required to make the API requests
 * @param {string} bearerToken token required for Authorization of the API requests
 * @param {string} userEmail email address of the user that is creating the case
 * @returns {Promise<string>} the userID of the provided user if successful
 */
export async function getUserID(
  apiContext: APIRequestContext,
  bearerToken: string,
  userEmail: string = "prl-system-update@mailinator.com",
): Promise<string> {
  let userID: string = "";
  const response = await apiContext.get(
    `${process.env.IDAM_TESTING_SUPPORT_USERS_URL}?email=${userEmail}`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    },
  );
  if (response.ok()) {
    const responseBody = await response.json();
    if (responseBody) {
      userID = responseBody.id;
    } else {
      throw new Error("Failed to find case data");
    }
  } else {
    throw new Error(
      `Failed to find case: ${response.status()} - ${response.statusText()}`,
    );
  }
  return userID;
}

export function getUrlPrefix(userID: string): string {
  const ccdUrl: string = process.env.CCD_DATA_STORE_URL as string;
  const jurisdiction: string = process.env.JURISDICTION as string;
  const caseType: string = process.env.CASE_TYPE as string;
  return `${ccdUrl}/caseworkers/${userID}/jurisdictions/${jurisdiction}/case-types/${caseType}`;
}

// unfortunately this has to be done through the UI for now
export async function completeServiceOfApplication(
  browser: Browser,
  caseRef: string,
): Promise<void> {
  const page: Page = await Helpers.openNewBrowserWindow(browser, "caseWorker");
  await Helpers.goToCase(page, config.manageCasesBaseURLCase, caseRef, "tasks");
  await ServiceOfApplicationLite.serviceOfApplicationLite(page);
}
