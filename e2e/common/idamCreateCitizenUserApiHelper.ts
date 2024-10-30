import { APIRequestContext, request } from "@playwright/test";
import * as dotenv from "dotenv";
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
 * @returns {Promise<string>} The access token if successful, otherwise throws an error
 */
export async function getAccessToken(
  apiContext: APIRequestContext,
): Promise<string> {
  try {
    const clientSecret = process.env.IDAM_SECRET;
    if (!clientSecret) {
      throw new Error("IDAM_SECRET environment variable is not defined");
    }
    const data = {
      grant_type: "client_credentials",
      client_id: "prl-cos-api",
      client_secret: clientSecret,
      scope: "profile roles",
    };
    const response = await apiContext.post(
      process.env.IDAM_TOKEN_URL as string,
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        form: data,
      },
    );
    if (!response.ok()) {
      const errorText = await response.text();
      console.error(
        "Error fetching access token:",
        response.status(),
        errorText,
      );
      throw new Error(`Failed to fetch access token: ${response.status()}`);
    }
    const responseData = await response.json();
    return responseData.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("An error occurred while fetching the access token");
  }
}

/**
 * Function to create a citizen user
 * @param {APIRequestContext} apiContext The API request context
 * @param token
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
  if (!response.ok()) {
    const errorText = await response.text();
    console.error("Error creating user:", response.status(), errorText);
    throw new Error(
      "Failed to create user, could be that you are not connected to the VPN",
    );
  }
  const responseData = await response.json();
  if (existsSync(".env")) {
    console.log("User created:", responseData);
  }
  return { email, password, id: responseData.id };
}

/**
 * Sets up a user by initializing API context, getting an access token, and creating a citizen user.
 * @returns {Promise<{ email: string; password: string; id: string }>} User information if successful
 * @throws Will throw an error if any step fails
 */
export async function setupUser(token: string): Promise<{
  email: string;
  password: string;
  id: string;
}> {
  const apiContext = await initializeAPIContext();
  return await createCitizenUser(apiContext, token);
}
