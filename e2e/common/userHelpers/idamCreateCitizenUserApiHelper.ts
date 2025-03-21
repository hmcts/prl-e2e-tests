import { APIRequestContext, request } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

/**
 * Function to create a citizen user
 * @param {APIRequestContext} apiContext The API request context
 * @param {string} token Bearer token passed from global setup
 * @returns {Promise<{email: string; password: string; id: string; forename: string; surname: string }>} The created user's details
 */
export async function createCitizenUser(
  apiContext: APIRequestContext,
  token: string,
): Promise<{
  email: string;
  password: string;
  id: string;
  forename: string;
  surname: string;
}> {
  if (!process.env.IDAM_CITIZEN_USER_PASSWORD) {
    throw new Error("PASSWORD environment variable is not defined");
  }
  const uniqueId = uuidv4();
  const id = uniqueId;
  const password = process.env.IDAM_CITIZEN_USER_PASSWORD as string;
  const email = `TEST_PRL_USER_citizen-user.${uniqueId}@test.local`;
  const forename = "fn_" + uniqueId.split("-")[0];
  const surname = "sn_" + uniqueId.split("-")[1];
  try {
    const response = await apiContext.post(
      process.env.IDAM_TESTING_SUPPORT_USERS_URL as string,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          password,
          user: {
            id,
            email,
            forename: forename,
            surname: surname,
            roleNames: ["citizen"],
          },
        },
      },
    );
    if (response.status() != 201) {
      throw new Error(
        `Response from IDAM was not successful: ${await response.json()}\n Status Code: ${response.status()}`,
      );
    }
    const responseData = await response.json();
    if (process.env.PWDEBUG) {
      console.log("User created:", responseData);
    }
    return { email, password, id: responseData.id, forename, surname };
  } catch (error) {
    if (process.env.PWDEBUG) {
      console.error(
        `Error: Unable to create the citizen user. Please check your VPN connection and confirm that the IDAM service is available.\n${error}`,
      );
    }
    throw new Error(
      `Failed to create citizen user. Check the URL or your network connection.\n${error}`,
    );
  }
}

/**
 * Sets up a citizen user with an existing token and initialized API context.
 * @param {string} token Bearer token from global setup
 * @returns {Promise<{ email: string; password: string; id: string }>} User information if successful
 */
export async function setupUser(token: string): Promise<{
  email: string;
  password: string;
  id: string;
  forename: string;
  surname: string;
}> {
  const apiContext = await request.newContext();
  return await createCitizenUser(apiContext, token);
}
