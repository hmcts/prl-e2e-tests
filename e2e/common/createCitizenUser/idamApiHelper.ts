import { APIRequestContext, request } from "@playwright/test";
import * as dotenv from "dotenv";
import qs from "qs";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

dotenv.config();

/**
 * Initializes the Playwright API request context.
 * @returns {Promise<APIRequestContext>}
 */
export async function initializeAPIContext(): Promise<APIRequestContext> {
  return await request.newContext();
}

/**
 * Function to get an access token from the IDAM service
 * @param {APIRequestContext} apiContext The API request context
 * @returns {Promise<string | null>} The access token if successful, otherwise null
 */
export async function getAccessToken(
  apiContext: APIRequestContext,
): Promise<string | null> {
  try {
    const data = {
      grant_type: "client_credentials",
      client_id: "prl-cos-api",
      client_secret: process.env.IDAM_SECRET,
      scope: "profile roles",
    };
    const response = await apiContext.post(
      process.env.IDAM_TOKEN_URL as string,
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
      },
    );
    if (response.ok()) {
      const responseData = await response.json();
      return responseData.access_token;
    } else {
      console.error(
        "Error fetching access token:",
        response.status(),
        await response.text(),
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
}

/**
 * Function to create a citizen user
 * @param {APIRequestContext} apiContext The API request context
 * @param {string} token The access token
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
  if (response.ok()) {
    const responseData = await response.json();
    if (existsSync(".env")) {
      // Verify if the .env file is present (indicating local test execution) and log the details of the created citizen user.
      console.log("User created:", responseData);
    }
    return { email, password, id: responseData.id };
  } else {
    console.error(
      "Error creating user:",
      response.status(),
      await response.text(),
    );
    throw new Error(
      "Failed to create user, could be that you are not connected to the VPN",
    );
  }
}
