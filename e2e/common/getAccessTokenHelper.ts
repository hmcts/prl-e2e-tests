import { APIRequestContext } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const citizenCreateUserData = {
  grant_type: "client_credentials",
  client_id: "prl-cos-api",
  client_secret: process.env.IDAM_SECRET,
  scope: "profile roles",
};

const daCourtNavCreateCaseData = {
  grant_type: "password",
  client_id: "courtnav-service",
  client_secret: process.env.COURTNAV_SECRET,
  scope: "openid profile roles",
  username: process.env.COURTNAV_USERNAME,
  password: process.env.COURTNAV_PASSWORD,
};

/**
 * Function to get an access token from the IDAM service
 * @param {APIRequestContext} apiContext The API request context
 * @returns {Promise<string>} The access token if successful, otherwise throws an error
 */
export async function getAccessToken(
  option: string,
  apiContext: APIRequestContext,
): Promise<string> {
  try {
    let data;
    if (option === "citizenCreateUser") {
      data = citizenCreateUserData;
    } else if (option === "daCourtNavCreateCase") {
      data = daCourtNavCreateCaseData;
    } else {
      throw new Error(`Invalid option: ${option}`);
    }
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
      console.log("Check your VPN connection or URL.");
      throw new Error(`Failed to fetch access token: ${response.status()}`);
    }
    const responseData = await response.json();
    return responseData.access_token;
  } catch (error) {
    console.log("Check your VPN connection or SECRET.");
    throw new Error("An error occurred while fetching the access token");
  }
}
