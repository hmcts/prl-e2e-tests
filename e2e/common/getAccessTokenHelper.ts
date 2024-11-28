import { APIRequestContext } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const citizenCreateUserData = {
  grant_type: "client_credentials",
  client_id: "prl-cos-api",
  client_secret: process.env.IDAM_SECRET as string,
  scope: "profile roles",
};

const daCourtNavCreateCaseData = {
  grant_type: "password",
  client_id: "courtnav-service",
  client_secret: process.env.COURTNAV_SECRET as string,
  scope: "openid profile roles",
  username: process.env.COURTNAV_USERNAME as string,
  password: process.env.COURTNAV_PASSWORD as string,
};

const systemCreateCaseBearerToken = {
  grant_type: "password",
  username: process.env.SYSTEM_UPDATE_USERNAME as string,
  password: process.env.SYSTEM_UPDATE_PASSWORD as string,
  client_id: "prl-cos-api",
  client_secret: process.env.IDAM_SECRET as string,
  scope: "openid profile roles",
  redirect_uri: process.env.REDIRECT_URI as string,
};

/**
 * Function to get an access token from the IDAM service
 * @param {string} option The option to determine which data set to use for the request
 * @param {APIRequestContext} apiContext The API request context
 * @returns {Promise<string>} The access token if successful, otherwise throws an error
 */
export async function getAccessToken(
  option: string,
  apiContext: APIRequestContext,
): Promise<string> {
  let data, url;
  try {
    switch (option) {
      case "citizenCreateUser":
        data = citizenCreateUserData;
        url = process.env.IDAM_TOKEN_URL as string;
        break;
      case "daCourtNavCreateCase":
        data = daCourtNavCreateCaseData;
        url = process.env.IDAM_TOKEN_URL as string;
        break;
      case "systemCreateCaseBearerToken":
        data = systemCreateCaseBearerToken;
        url = process.env.IDAM_API_URL as string;
        break;
      default:
        throw new Error(`Invalid option: ${option}`);
    }
    const response = await apiContext.post(url, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: data,
    });
    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch access token: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`,
      );
    }
    const responseData = await response.json();
    return responseData.access_token;
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the access token: ${error instanceof Error ? error.message : error}`,
    );
  }
}

export async function getS2SToken(
  apiContext: APIRequestContext,
): Promise<string> {
  try {
    const response = await apiContext.post(
      process.env.S2S_TOKEN_URL as string,
      {
        headers: { "content-type": "application/json" },
        data: {
          microservice: "ccd_data",
        },
      },
    );
    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch access token: ${response.status()} - ${errorText}. Ensure your VPN is connected or check your URL/SECRET.`,
      );
    }
    return response.text();
  } catch (error) {
    throw new Error(
      `An error occurred while fetching the access token: ${error instanceof Error ? error.message : error}`,
    );
  }
}
