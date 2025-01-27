import { APIRequestContext, request } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import process from "node:process";

/**
 * Function to create a citizen user
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
  const idamUrl = process.env.IDAM_TESTING_SUPPORT_USERS_URL as string;
  let userId: string = "";
  switch (user) {
    case "citizen":
      password = process.env.IDAM_CITIZEN_USER_PASSWORD as string;
      email = `TEST_PRL_USER_citizen-user.${uniqueId}@test.local` as string;
      forename = "fn_" + uniqueId.split("-")[0];
      surname = "sn_" + uniqueId.split("-")[1];
      roleNames = ["citizen"];
      break;
    case "solicitor":
      password = process.env.SOLICITOR_PASSWORD as string;
      email = `TEST_PRL_USER_solicitor-user.${uniqueId}@test.local` as string;
      forename = "fn_" + uniqueId.split("-")[0];
      surname = "sn_" + uniqueId.split("-")[1];
      roleNames = [
        "pui-finance-manager",
        "pui-user-manager",
        "caseworker-privatelaw",
        "caseworker-civil",
        "pui-caa",
        "caseworker-publiclaw",
        "caseworker-divorce",
        "payments",
        "caseworker-divorce-solicitor",
        "caseworker-privatelaw-solicitor",
        "pui-organisation-manager",
        "caseworker-probate",
        "caseworker-probate-solicitor",
        "caseworker-ia",
        "caseworker-publiclaw-solicitor",
        "pui-case-manager",
        "caseworker-divorce-financialremedy",
        "caseworker-ia-legalrep-solicitor",
        "caseworker-divorce-financialremedy-solicitor",
        "caseworker-civil-solicitor",
        "caseworker",
      ];
      break;
    case "judge":
      password = process.env.JUDGE_PASSWORD as string;
      email = process.env.JUDGE_USERNAME as string;
      roleNames = [
        "caseworker-privatelaw",
        "caseworker-privatelaw-judge",
        "judge",
        "caseworker",
        "judiciary",
      ];
      forename = "Yolanda";
      surname = "Cooper";
      userId = "f7c3bcbd-3ee9-4b36-bc43-bdb02096f773";
      break;
    case "caseWorker":
      password = process.env.CASEWORKER_PASSWORD as string;
      email = `TEST_PRL_USER_caseworker-user.${uniqueId}@test.local` as string;
      roleNames = [
        "caseworker-privatelaw",
        "cwd-user",
        "staff-admin",
        "caseworker",
      ];
      forename = "fn_" + uniqueId.split("-")[0];
      surname = "sn_" + uniqueId.split("-")[1];
      break;
    default:
      throw new Error(`Unknown user type: ${user}`);
  }
  const id = uniqueId;
  if (user != "judge") {
    try {
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
      if (response.status() != 201) {
        throw new Error(
          `Response from IDAM was not successful: ${await response.text()}\n Status Code: ${response.status()}`,
        );
      }
      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (error) {
        throw new Error(
          `Failed to parse JSON response: ${responseText}: ${error}`,
        );
      }
      if (process.env.PWDEBUG) {
        console.log("User created:", responseData);
      }
      return { email, password, id, user };
    } catch (error) {
      throw new Error(
        `Failed to create citizen user. Check the URL or your network connection.\n${error}`,
      );
    }
  } else {
    try {
      const response = await apiContext.put(idamUrl + "/" + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          password,
          user: {
            id: "f7c3bcbd-3ee9-4b36-bc43-bdb02096f773",
            email,
            forename,
            surname,
            displayName: "Yolanda Cooper",
            roleNames,
            accountStatus: "ACTIVE",
            recordType: "LIVE",
            createDate: "2024-03-08T17:18:01.160098Z",
            lastModified: "2024-03-08T17:18:02.174071Z",
            accessLockedDate: "2025-01-21T12:52:21.69Z",
            lastLoginDate: "2025-01-21T12:00:00Z",
          },
        },
      });
      if (response.status() != 200 && response.status() != 409) {
        throw new Error(
          `Response from IDAM was not successful: ${await response.text()}\n Status Code: ${response.status()}`,
        );
      }
      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (error) {
        throw new Error(
          `Failed to parse JSON response: ${responseText}: ${error}`,
        );
      }
      if (process.env.PWDEBUG) {
        console.log("User created:", responseData);
      }
      return { email, password, id, user };
    } catch (error) {
      throw new Error(
        `Failed to create citizen user. Check the URL or your network connection.\n${error}`,
      );
    }
  }
}

/**
 * Sets up a citizen user with an existing token and initialized API context.
 * @param {string} token Bearer token from global setup
 * @param {string} user The type of user to create
 * @returns {Promise<{ email: string; password: string; id: string; user: string }>} User information if successful
 */
export async function setupUser(
  token: string,
  user: string,
): Promise<{
  email: string;
  password: string;
  id: string;
  user: string;
}> {
  const apiContext = await request.newContext();
  return await createUser(apiContext, token, user);
}
