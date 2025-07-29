import { APIRequestContext, request } from "@playwright/test";
import json from "../caseData/citizenCA/c100-citizen-dummy-case-details.json" with { type: "json" };
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";

export class CitizenCACaseUtils {
  constructor(
    private serviceAuthUtils: ServiceAuthUtils,
    private idamUtils: IdamUtils,
  ) {}

  private async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext();
  }

  public async createDraftCase(userInfo: {
    email: string;
    password: string;
  }): Promise<string> {
    // get IDAM citizen user token
    const token = await this.idamUtils.generateIdamToken({
      grantType: "password",
      username: userInfo.email,
      password: userInfo.password,
      scope: "openid profile roles",
      clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
      clientSecret: process.env.IDAM_SECRET as string,
      redirectUri: `${process.env.PRL_COS_AAT_URL as string}/oauth2/callback,`,
    });

    // get S2S token
    const s2sToken = await this.serviceAuthUtils.retrieveToken({
      microservice: "ccd_data",
    });

    // create case
    const apiContext = await this.createApiContext();
    const caseData = json;
    const urlCreateCase = `${process.env.PRL_COS_API_URL as string}/testing-support/create-dummy-citizen-case-with-body`;
    const responseCreateCase = await apiContext.post(urlCreateCase, {
      headers: {
        Authorization: `Bearer ${token}`,
        ServiceAuthorization: `Bearer ${s2sToken}`,
        "Content-Type": "application/json",
      },
      data: caseData,
    });

    if (!responseCreateCase.ok()) {
      throw new Error(
        `Failed to create case: ${responseCreateCase.status()} - ${await responseCreateCase.text()}`,
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
