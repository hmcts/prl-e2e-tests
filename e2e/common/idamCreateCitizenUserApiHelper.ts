import { APIRequestContext, request } from "@playwright/test";
import * as dotenv from "dotenv";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// /**
//  * Function to get an access token from the IDAM service
//  * @param {APIRequestContext} apiContext The API request context
//  * @returns {Promise<string>} The access token if successful, otherwise throws an error
//  */
// export async function getAccessToken(
//   apiContext: APIRequestContext,
// ): Promise<string> {
//   try {
//     const clientSecret = process.env.IDAM_SECRET;
//     if (!clientSecret) {
//       throw new Error("IDAM_SECRET environment variable is not defined");
//     }
//     const data = {
//       grant_type: "client_credentials",
//       client_id: "prl-cos-api",
//       client_secret: clientSecret,
//       scope: "profile roles",
//     };
//     const response = await apiContext.post(
//       process.env.IDAM_TOKEN_URL as string,
//       {
//         headers: { "content-type": "application/x-www-form-urlencoded" },
//         form: data,
//       },
//     );
//     if (!response.ok()) {
//       const errorText = await response.text();
//       console.error(
//         "Error fetching access token:",
//         response.status(),
//         errorText,
//       );
//       console.log("Check your VPN connection or IDAM_TOKEN_URL.");
//       throw new Error(`Failed to fetch access token: ${response.status()}`);
//     }
//     const responseData = await response.json();
//     return responseData.access_token;
//   } catch (error) {
//     console.log("Check your VPN connection or IDAM_SECRET.");
//     throw new Error("An error occurred while fetching the access token");
//   }
// }

/**
 * Function to create a citizen user
 * @param {APIRequestContext} apiContext The API request context
 * @param {string} token Bearer token passed from global setup
 * @returns {Promise<{ email: string; password: string; id: string }>} The created user's details
 */
export async function createCitizenUser(
  apiContext: APIRequestContext,
  token: string,
): Promise<{ email: string; password: string; id: string }> {
  if (!process.env.IDAM_CITIZEN_USER_PASSWORD) {
    throw new Error("PASSWORD environment variable is not defined");
  }
  const uniqueId = uuidv4();
  const id = uniqueId;
  const password = process.env.IDAM_CITIZEN_USER_PASSWORD as string;
  const email = `TEST_PRL_USER_citizen-user.${uniqueId}@test.local`;
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
            forename: "fn_" + uniqueId.split("-")[0],
            surname: "sn_" + uniqueId.split("-")[1],
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
    if (existsSync(".env")) {
      console.log("User created:", responseData);
    }
    return { email, password, id: responseData.id };
  } catch (error) {
    if (existsSync(".env")) {
      console.error(
        "Error: Unable to create the citizen user. Please check your VPN connection and confirm that the IDAM service is available.",
      );
    }
    throw new Error(
      "Failed to create citizen user. Check the URL or your network connection.",
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
}> {
  const apiContext = await request.newContext();
  return await createCitizenUser(apiContext, token);
}
