import { getAccessToken, getS2SToken } from "./getAccessTokenHelper.ts";
import { APIRequestContext, Browser, Page, request } from "@playwright/test";
import solicitorCaseData from "../caseData/solicitorCaseData.json";
import * as process from "node:process";
import { Helpers } from "./helpers.ts";
import config from "../config.ts";
import { ServiceOfApplicationLite } from "../journeys/manageCases/caseProgression/e2eFlowUpToServiceOfApplication/serviceOfApplication/serviceOfApplicationLite.ts";

const CaseEvents: string[] = [
  "fl401TypeOfApplication",
  "withoutNoticeOrderDetails",
  "applicantsDetails",
  "respondentsDetails",
  "fl401ApplicantFamilyDetails",
  "respondentRelationship",
  "respondentBehaviour",
  "fl401OtherProceedings",
  "attendingTheHearing",
  "welshLanguageRequirements",
  "fl401UploadDocuments",
  "fl401StatementOfTruthAndSubmit",
  "fl401SendToGateKeeper",
  "serviceOfApplication",
];

function getUrlPrefix(userID: string): string {
  const ccdUrl: string = process.env.CCD_DATA_STORE_URL as string;
  const jurisdiction: string = process.env.JURISDICTION as string;
  const caseType: string = process.env.CASE_TYPE as string;
  return `${ccdUrl}/caseworkers/${userID}/jurisdictions/${jurisdiction}/case-types/${caseType}`;
}

/**
 * Function to create a DA Solicitor case and complete the relevant case events from the CaseEvents list.
 * @param {Browser} browser the browser to be used if service of application needs to be completed
 * @param {string} finalCaseEvent the name of the final case event to complete for this case (based on the CaseEvents list order),
 * if no event provided then complete up to and including service of application
 * @returns {Promise<string>} the case reference if successful, otherwise throws an error
 */
export async function createCaseAndCompleteCaseEvents(
  browser: Browser,
  finalCaseEvent: string = "",
): Promise<string> {
  const apiContextSolicitorCreateCase: APIRequestContext =
    await request.newContext();
  const tokenSolicitorCreateCase = await getAccessToken(
    "solicitorCreateCase",
    apiContextSolicitorCreateCase,
  );
  if (!tokenSolicitorCreateCase) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  const apiContextS2SToken: APIRequestContext = await request.newContext();
  const microservice: string = "prl_cos_api";
  const s2sToken: string = await getS2SToken(apiContextS2SToken, microservice);
  const { userID, caseID } = await createBlankCase(
    apiContextSolicitorCreateCase,
    tokenSolicitorCreateCase,
    s2sToken,
  );
  for (const caseEvent of CaseEvents) {
    if (caseEvent === "serviceOfApplication") {
      await completeServiceOfApplication(browser, caseID);
    } else {
      const caseEventToken: string = await getEventToken(
        apiContextSolicitorCreateCase,
        tokenSolicitorCreateCase,
        s2sToken,
        userID,
        caseEvent,
        caseID,
      );
      await actionCaseEvent(
        apiContextSolicitorCreateCase,
        tokenSolicitorCreateCase,
        s2sToken,
        userID,
        caseID,
        caseEvent,
        caseEventToken,
      );
    }
    if (caseEvent === finalCaseEvent) {
      break;
    }
  }
  return caseID;
}

/**
 * Function to create a blank DA Solicitor case.
 * @param {APIRequestContext} apiContext api context required to make the API requests
 * @param {string} bearerToken token required for Authorization of the API requests
 * @param {string} s2sToken token required for Service Authorization of the API requests
 * @param {string} userEmail email address of the user that is creating the case
 * @returns {Promise<{ userID: string; caseID: string }} an object containing the userID for the user email provided and
 * the caseID of the blank case that is created if successful.
 */
async function createBlankCase(
  apiContext: APIRequestContext,
  bearerToken: string,
  s2sToken: string,
  userEmail: string = "prl-system-update@mailinator.com",
): Promise<{ userID: string; caseID: string }> {
  let caseID: string;
  const userID: string = await getUserID(apiContext, bearerToken, userEmail);
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
  return { userID: userID, caseID: caseID };
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
async function getEventToken(
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
    // @ts-expect-error - caseEvent will always map to its associated json object
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
async function getUserID(
  apiContext: APIRequestContext,
  bearerToken: string,
  userEmail: string,
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

// unfortunately this has to be done through the UI for now
async function completeServiceOfApplication(
  browser: Browser,
  caseRef: string,
): Promise<void> {
  const page: Page = await Helpers.openNewBrowserWindow(browser, "caseWorker");
  await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "tasks");
  await ServiceOfApplicationLite.serviceOfApplicationLite(page);
}
