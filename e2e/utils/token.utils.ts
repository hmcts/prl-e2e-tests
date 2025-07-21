import { IdamUtils } from "@hmcts/playwright-common";

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
    grantType: "client_credentials",
    clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
    clientSecret: process.env.IDAM_SECRET as string,
    scope: "profile roles",
  };

  private readonly daCourtNavCreateCaseData = {
    grantType: "password",
    clientId: "courtnav-service",
    clientSecret: process.env.COURTNAV_SECRET as string,
    scope: "openid profile roles",
    username: process.env.COURTNAV_USERNAME as string,
    password: process.env.COURTNAV_PASSWORD as string,
  };

  private readonly ccdCaseData = {
    grantType: "password",
    username: process.env.CCD_DATA_STORE_CLIENT_USERNAME as string,
    password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD as string,
    clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
    clientSecret: process.env.CCD_DATA_STORE_SECRET as string,
    scope: "openid profile roles",
    redirectUri: process.env.MANAGE_CASE_REDIRECT_URI as string,
  };

  private readonly solicitorCaseData = {
    clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
    clientSecret: process.env.IDAM_SECRET as string,
    grantType: "password",
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
    let data;
    switch (option) {
      case "citizenCreateUser":
        data = this.citizenCreateUserData;
        break;
      case "daCourtNavCreateCase":
        data = this.daCourtNavCreateCaseData;
        break;
      case "solicitorCreateCase":
        data = this.solicitorCaseData;
        break;
      case "accessCode":
        data = this.ccdCaseData;
        break;
      default:
        throw new Error(
          `Invalid option: '${option}'. Please provide a valid option like 'citizenCreateUser', 'daCourtNavCreateCase', 'accessCode', or 'solicitorCreateCase'.`,
        );
    }

    return this.idamUtils.generateIdamToken(data);
  }
}
