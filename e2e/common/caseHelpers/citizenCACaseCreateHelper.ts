import { APIRequestContext, Page, request } from "@playwright/test";
import { getS2SToken } from "./getAccessTokenHelper.ts";
import json from "../../caseData/citizenCA/c100-citizen-dummy-case-details.json" with { type: "json" };

export class CitizenCACaseCreator {
  public static async createDraftCitizenCACase(
    page: Page,
    application: string,
    userInfo: { email: string; password: string }
  ): Promise<string> {
    // get IDAM citizen user token
    const microservice = process.env.CCD_DATA_STORE_CLIENT_ID as string;
    const apiContextCitizenUser: APIRequestContext = await request.newContext();
    const idamTokenUrl = process.env.IDAM_API_URL as string;
    const responseCitizenUser = await apiContextCitizenUser.post(idamTokenUrl, {
      form: {
        grant_type: "password",
        username: userInfo.email,
        password: userInfo.password,
        scope: "openid profile roles",
        client_id: microservice,
        client_secret: process.env.IDAM_SECRET as string,
        redirect_uri: `${process.env.PRL_COS_AAT_URL as string}/oauth2/callback,`
      }
    });

    if (!responseCitizenUser.ok()) {
      throw new Error(
        `Failed to get user token: ${responseCitizenUser.status()} - ${await responseCitizenUser.body()}`
      );
    }

    const responseCitizenUserBody = await responseCitizenUser.json();
    const accessToken = responseCitizenUserBody.access_token as string;
    if (!accessToken) {
      throw new Error("Failed to retrieve access token");
    }

    // get S2S token
    const apiContextS2SToken: APIRequestContext = await request.newContext();
    const s2sToken = await getS2SToken(apiContextS2SToken, "ccd_data");

    // create case
    const caseData = json;
    const apiContextCreateCase: APIRequestContext = await request.newContext();
    const urlCreateCase = `${process.env.PRL_COS_API_URL as string}/testing-support/create-dummy-citizen-case-with-body`;
    const responseCreateCase = await apiContextCreateCase.post(urlCreateCase, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ServiceAuthorization: `Bearer ${s2sToken}`,
        "Content-Type": "application/json"
      },
      data: caseData
    });

    if (!responseCreateCase.ok()) {
      throw new Error(
        `Failed to create case: ${responseCreateCase.status()} - ${await responseCreateCase.body()}`
      );
    }

    const responseBodyCreateCase = await responseCreateCase.json();
    const ccdRef = responseBodyCreateCase.id;
    if (!ccdRef) {
      throw new Error("Failed to retrieve CCD case reference");
    }
    return ccdRef;
  }
}
