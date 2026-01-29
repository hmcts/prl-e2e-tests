import { APIRequestContext, request } from "@playwright/test";
import json from "../caseData/citizenCA/c100-citizen-dummy-case-details.json" with { type: "json" };
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";

type JsonObjectWithId = {
  id: string;
  [key: string]: unknown;
};

export class CitizenCACaseUtils {
  constructor(
    private serviceAuthUtils: ServiceAuthUtils,
    private idamUtils: IdamUtils,
  ) {}

  public async createAndSubmitCase(userInfo: {
    email: string;
    password: string;
  }): Promise<string> {
    // get IDAM citizen user token
    const bearerToken: string = await this.idamUtils.generateIdamToken({
      grantType: "password",
      username: userInfo.email,
      password: userInfo.password,
      scope: "openid profile roles",
      clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
      clientSecret: process.env.IDAM_SECRET as string,
      redirectUri: process.env.MANAGE_CASE_REDIRECT_URI as string,
    });

    // get S2S token
    const s2sToken: string = await this.serviceAuthUtils.retrieveToken({
      microservice: "ccd_data",
    });
    const createdCaseJsonData: JsonObjectWithId = await this.createDraftCase(
      bearerToken,
      s2sToken,
    );

    // get case number from created case data
    const caseNumber: string = String(createdCaseJsonData.id);
    if (!caseNumber) {
      throw new Error("Failed to retrieve CCD case reference");
    }

    console.log(`case number: ${caseNumber}`);

    await this.submitCase(
      caseNumber,
      createdCaseJsonData,
      bearerToken,
      s2sToken,
    );
    return caseNumber;
  }

  private async createDraftCase(
    bearerToken: string,
    s2sToken: string,
  ): Promise<JsonObjectWithId> {
    // create case
    const apiContext = await this.createApiContext();
    const caseData = json;
    const urlCreateCase = `${process.env.PRL_COS_API_URL as string}/testing-support/create-dummy-citizen-case-with-body`;
    const responseCreateCase = await apiContext.post(urlCreateCase, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
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

    return await responseCreateCase.json();
  }

  private async submitCase(
    caseNumber: string,
    caseData: JsonObjectWithId,
    bearerToken: string,
    s2sToken: string,
  ): Promise<void> {
    const apiContext = await this.createApiContext();
    const urlSubmitCase = `${process.env.PRL_COS_API_URL as string}/citizen/${caseNumber}/citizen-case-submit/submit-c100-application`;
    const responseCreateCase = await apiContext.post(urlSubmitCase, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        ServiceAuthorization: `Bearer ${s2sToken}`,
        "Content-Type": "application/json",
      },
      data: caseData,
    });

    if (!responseCreateCase.ok()) {
      console.log(await responseCreateCase.json());
      throw new Error(
        `Failed to submit case: ${responseCreateCase.status()} - ${await responseCreateCase.text()}`,
      );
    }
  }

  private async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext();
  }
}
