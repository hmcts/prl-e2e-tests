import { APIRequestContext, request } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import process from "node:process";

export async function setupUser(
  token: string,
  user: string,
): Promise<{
  email: string;
  password: string;
  user: string;
  forename: string;
  surname: string;
}> {
  const apiContext = await request.newContext();
  return createUser(apiContext, token, user);
}

/**
 * Function to create a user, retrying with a PUT request if a 409 Conflict occurs.
 * @param {APIRequestContext} apiContext The API request context
 * @param {string} token Bearer token passed from global setup
 * @param {string} user The type of user to create
 * @returns {Promise<{ email: string; password: string; user: string }>} The created user's details
 */
export async function createUser(
  apiContext: APIRequestContext,
  token: string,
  user: string,
): Promise<{
  email: string;
  password: string;
  user: string;
  forename: string;
  surname: string;
}> {
  let password: string;
  let email: string;
  let roleNames: string[] = [];
  const uniqueId = uuidv4();
  let forename: string;
  let surname: string;
  const idamUrl = process.env.IDAM_TESTING_SUPPORT_USERS_URL!;

  switch (user) {
    case "citizen":
      password = process.env.IDAM_CITIZEN_USER_PASSWORD!;
      email = `TEST_PRL_USER_citizen.${uniqueId}@test.local`;
      forename = "fn_" + uniqueId.split("-")[0];
      surname = "sn_" + uniqueId.split("-")[1];
      roleNames = ["citizen"];
      break;
    case "solicitor":
      password = process.env.SOLICITOR_PASSWORD!;
      email = `TEST_PRL_USER_solicitor.${uniqueId}@test.local`;
      forename = "fn_" + uniqueId.split("-")[0];
      surname = "sn_" + uniqueId.split("-")[1];
      roleNames = [
        "pui-user-manager",
        "caseworker-privatelaw",
        "pui-caa",
        "payments",
        "caseworker-privatelaw-solicitor",
        "pui-organisation-manager",
        "pui-case-manager",
        "caseworker",
      ];
      break;
    case "judge":
      password = process.env.JUDGE_PASSWORD!;
      email = process.env.JUDGE_USERNAME!;
      roleNames = [
        "caseworker-privatelaw",
        "caseworker-privatelaw-judge",
        "judge",
        "caseworker",
        "judiciary",
      ];
      forename = "Yolanda";
      surname = "Cooper";
      break;
    case "caseWorker":
      password = process.env.CASEWORKER_PASSWORD!;
      email = `TEST_PRL_USER_court_admin.${uniqueId}@test.local`;
      roleNames = [
        "caseworker-privatelaw",
        "cwd-user",
        "staff-admin",
        "caseworker",
        "caseworker-privatelaw-courtadmin",
      ];
      forename = "PRL AAT AM";
      surname = "Swansea HCTL";
      break;
    case "caseManager":
      password = process.env.CASEMANAGER_PASSWORD!;
      email = `TEST_PRL_USER_case_manager.${uniqueId}@test.local`;
      roleNames = [
        "caseworker-privatelaw",
        "cwd-user",
        "caseworker",
        "caseworker-privatelaw-courtadmin",
      ];
      forename = "PRL Case Manager";
      surname = "CTSC Team Leader";
      break;
    default:
      throw new Error(`Unknown user type: ${user}`);
  }

  const id = uniqueId;

  const response = await apiContext.post(idamUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      password,
      user: {
        id,
        email,
        forename,
        surname,
        roleNames,
      },
    },
  });

  if (response.status() === 201) {
    return { email, password, user, forename, surname };
  }
  if (response.status() === 409) {
    return updateUser(
      apiContext,
      token,
      idamUrl,
      email,
      forename,
      surname,
      password,
      roleNames,
    );
  }
  throw new Error(
    `IDAM request failed: ${await response.text()} (Status Code: ${response.status()})`,
  );
}

async function updateUser(
  apiContext: APIRequestContext,
  token: string,
  idamUrl: string,
  email: string,
  forename: string,
  surname: string,
  password: string,
  roleNames: string[],
): Promise<{
  email: string;
  password: string;
  user: string;
  forename: string;
  surname: string;
}> {
  const responseGetId = await apiContext.get(
    `${idamUrl}?email=${encodeURIComponent(email)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  if (!responseGetId.ok()) {
    throw new Error(`Failed to fetch user details: ${responseGetId.status()}`);
  }
  const responseGetIdBody = await responseGetId.json();
  const judgeId = responseGetIdBody.id;
  const response = await apiContext.put(`${idamUrl}/${judgeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      password,
      user: {
        email,
        forename,
        surname,
        displayName: `${forename} ${surname}`,
        roleNames,
        accountStatus: "ACTIVE",
        recordType: "LIVE",
      },
    },
  });

  if (response.status() === 200 || response.status() === 409) {
    return { email, password, user: "updated", forename, surname };
  }

  throw new Error(
    `Failed to update user: ${await response.text()} (Status Code: ${response.status()})`,
  );
}
