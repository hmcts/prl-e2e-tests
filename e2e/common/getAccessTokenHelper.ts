import { APIRequestContext } from "@playwright/test";
import Config from "../config.ts";
const env = process.env.TEST_ENV || "aat";
const urlConfig = Config.urlConfig(env);
const courtNavConfig = Config.courtNavEnvConfig(env);
const citizenCreateUserData = {
  grant_type: "client_credentials",
  client_id: process.env.CCD_DATA_STORE_CLIENT_ID as string,
  client_secret: process.env.IDAM_SECRET as string,
  scope: "profile roles",
  token_url: urlConfig.IDAM_TOKEN_URL,
};

const daCourtNavCreateCaseData = {
  grant_type: "password",
  client_id: "courtnav-service",
  client_secret: process.env.COURTNAV_SECRET as string,
  scope: "openid profile roles",
  username: courtNavConfig.COURTNAV_USERNAME as string,
  password: process.env.COURTNAV_PASSWORD as string,
  token_url: urlConfig.IDAM_TOKEN_URL,
};

const ccdCaseData = {
  grant_type: "password",
  username: process.env.CCD_DATA_STORE_CLIENT_USERNAME as string,
  password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD as string,
  client_id: process.env.CCD_DATA_STORE_CLIENT_ID as string,
  client_secret: process.env.CCD_DATA_STORE_SECRET as string,
  scope: "openid profile roles",
  redirect_uri: process.env.MANAGE_CASE_REDIRECT_URI as string,
  token_url: urlConfig.IDAM_TOKEN_URL,
};

const solicitorCaseData = {
  client_id: process.env.CCD_DATA_STORE_CLIENT_ID as string,
  client_secret: process.env.IDAM_SECRET as string,
  grant_type: "password",
  scope: "openid profile roles",
  username: process.env.CCD_DATA_STORE_CLIENT_USERNAME as string,
  password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD as string,
  token_url: urlConfig.IDAM_TOKEN_URL,
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
        url = data.token_url;
        break;
      case "daCourtNavCreateCase":
        data = daCourtNavCreateCaseData;
        url = data.token_url;
        break;
      case "accessCode":
        data = ccdCaseData;
        url = data.token_url;
        break;
      case "solicitorCreateCase":
        data = solicitorCaseData;
        url = data.token_url;
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
  microservice: string,
): Promise<string> {
  try {
    const response = await apiContext.post(
      urlConfig.S2S_TOKEN_URL, // Use the environment-specific URL
      {
        headers: { "content-type": "application/json", Accept: "*/*" },
        data: {
          microservice: microservice,
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
