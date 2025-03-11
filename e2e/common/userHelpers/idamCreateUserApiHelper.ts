import { APIRequestContext, request } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import process from "node:process";

export async function setupUser(
  token: string,
  user: string,
): Promise<{ email: string; password: string; id: string; user: string }> {
  const apiContext = await request.newContext();
  return createUser(apiContext, token, user);
}

/**
 * Function to create a user, retrying with a PUT request if a 409 Conflict occurs.
 * @param {APIRequestContext} apiContext The API request context
 * @param {string} token Bearer token passed from global setup
 * @param {string} user The type of user to create
 * @returns {Promise<{ email: string; password: string; id: string; user: string }>} The created user's details
 */
export async function createUser(
  apiContext: APIRequestContext,
  token: string,
  user: string,
): Promise<{ email: string; password: string; id: string; user: string }> {
  let password: string;
  let email: string;
  let roleNames: string[] = [];
  const uniqueId = uuidv4();
  let forename: string;
  let surname: string;
  const idamUrl = process.env.IDAM_TESTING_SUPPORT_USERS_URL!;
  let userId = "";

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
      userId = "49196024-14f7-4383-88dd-5a1a27293169";
      break;
    case "caseWorker":
      password = process.env.CASEWORKER_PASSWORD!;
      email = `TEST_PRL_USER_court_admin.${uniqueId}@test.local`;
      roleNames = [
        "caseworker-privatelaw",
        "cwd-user",
        "staff-admin",
        "caseworker",
      ];
      forename = "PRL AAT AM";
      surname = "Swansea HCTL";
      userId = "4beb9cfb-1178-4a2f-aaa3-ddf1dc6bb9de";
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
    return { email, password, id, user };
  }
  if (response.status() === 409) {
    return updateUser(
      apiContext,
      token,
      idamUrl,
      userId,
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
  userId: string,
  email: string,
  forename: string,
  surname: string,
  password: string,
  roleNames: string[],
): Promise<{ email: string; password: string; id: string; user: string }> {
  const response = await apiContext.put(`${idamUrl}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      password,
      user: {
        id: userId,
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
    return { email, password, id: userId, user: "updated" };
  }

  throw new Error(
    `Failed to update user: ${await response.text()} (Status Code: ${response.status()})`,
  );
}
