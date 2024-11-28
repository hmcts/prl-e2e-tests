import { APIRequestContext, request } from "@playwright/test";
import { existsSync } from "fs";
import { getAccessToken, getS2SToken } from "./getAccessTokenHelper";
import createCaseSystemJudicialReviewPayload from "../caseData/createCaseSystem/createCaseSystemJudicialReview.json";

async function createCaseSystemUser(): Promise<string> {
  const apiContextSystemUser: APIRequestContext = await request.newContext();
  const apiContextS2SToken: APIRequestContext = await request.newContext();
  const tokenSystemUserCreateCase = await getAccessToken(
    "systemCreateCaseBearerToken",
    apiContextSystemUser,
  );
  const s2sToken = await getS2SToken(apiContextS2SToken);
  const payload = {
    ...createCaseSystemJudicialReviewPayload,
    event_token: process.env.EVENT_TOKEN as string, // Add dynamic event token
  };

  const response = await apiContextSystemUser.post(
    process.env.CREATE_CASE_URL as string, // Replace with the actual endpoint
    {
      headers: {
        Authorization: `Bearer ${tokenSystemUserCreateCase}`,
        ServiceAuthorization: `Bearer ${s2sToken}`,
      },
      data: payload,
    },
  );
  if (response.ok()) {
    const responseBody = await response.json();
    if (responseBody.id) {
      if (existsSync(".env")) {
        console.log("CCD Reference:", responseBody.id);
      }
      return responseBody.id;
    } else {
      throw new Error("Response did not contain a case ID");
    }
  } else {
    throw new Error(
      `Failed to create case: ${response.status()} - ${response.statusText()}`,
    );
  }
}
export default createCaseSystemUser;
