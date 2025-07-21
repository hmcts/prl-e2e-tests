import { IdamUtils } from "@hmcts/playwright-common";

export interface IdamTokenParams {
  grantType: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  username?: string;
  password?: string;
  redirectUri?: string;
}

/**
 * Utility class for managing authentication tokens (IDAM and S2S).
 */
export class TokenUtils {
  constructor(private idamUtils: IdamUtils) {}

  /**
   * Defines the data structures required for different IDAM token requests.
   * These are private as they are internal configurations for the class methods.
   */
  private readonly citizenCreateUserData = {
    grant_type: "client_credentials",
    client_id: process.env.CCD_DATA_STORE_CLIENT_ID as string,
    client_secret: process.env.IDAM_SECRET as string,
    scope: "profile roles",
  };

  private readonly daCourtNavCreateCaseData = {
    grant_type: "password",
    client_id: "courtnav-service",
    client_secret: process.env.COURTNAV_SECRET as string,
    scope: "openid profile roles",
    username: process.env.COURTNAV_USERNAME as string,
    password: process.env.COURTNAV_PASSWORD as string,
  };

  private readonly ccdCaseData = {
    grant_type: "password",
    username: process.env.CCD_DATA_STORE_CLIENT_USERNAME as string,
    password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD as string,
    client_id: process.env.CCD_DATA_STORE_CLIENT_ID as string,
    client_secret: process.env.CCD_DATA_STORE_SECRET as string,
    scope: "openid profile roles",
    redirect_uri: process.env.MANAGE_CASE_REDIRECT_URI as string,
  };

  private readonly solicitorCaseData = {
    client_id: process.env.CCD_DATA_STORE_CLIENT_ID as string,
    client_secret: process.env.IDAM_SECRET as string,
    grant_type: "password",
    scope: "openid profile roles",
    username: process.env.CCD_DATA_STORE_CLIENT_USERNAME as string,
    password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD as string,
  };

  /**
   * Retrieves an access token from the IDAM service based on the specified option.
   * @param {string} option - The type of user/client for which to get the token (e.g., "citizenCreateUser", "solicitorCreateCase").
   * @returns {Promise<string>} A promise that resolves with the access token.
   * @throws {Error} If an invalid option is provided or if token retrieval fails.
   */
  public async getAccessToken(option: string): Promise<string> {
    let rawData;
    switch (option) {
      case "citizenCreateUser":
        rawData = this.citizenCreateUserData;
        break;
      case "daCourtNavCreateCase":
        rawData = this.daCourtNavCreateCaseData;
        break;
      case "ccdCaseData":
        rawData = this.ccdCaseData;
        break;
      case "solicitorCreateCase":
        rawData = this.solicitorCaseData;
        break;
      case "accessCode":
        rawData = this.ccdCaseData;
        break;
      default:
        throw new Error(
          `Invalid option: '${option}'. Please provide a valid option like 'citizenCreateUser', 'daCourtNavCreateCase', 'accessCode', or 'solicitorCreateCase'.`,
        );
    }
    const transformedData: IdamTokenParams = {
      grantType: rawData.grant_type,
      clientId: rawData.client_id,
      clientSecret: rawData.client_secret,
      scope: rawData.scope,
      // Optional properties - only include if they exist in rawData to avoid passing undefined
      ...(rawData.username && { username: rawData.username }),
      ...(rawData.password && { password: rawData.password }),
      ...(rawData.redirect_uri && { redirectUri: rawData.redirect_uri }),
    };

    return this.idamUtils.generateIdamToken(transformedData);
  }

}
