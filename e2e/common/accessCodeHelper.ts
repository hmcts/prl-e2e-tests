import { APIRequestContext, request } from "@playwright/test";
import { getAccessToken, getS2SToken } from "./getAccessTokenHelper";

interface CaseInvite {
  id: string;
  value: CaseInviteDetails;
}

interface CaseInviteDetails {
  accessCode: string;
  isApplicant: string;
}

export class AccessCodeHelper {
  public static async getApplicantAccessCode(ccdRef: string): Promise<string> {
    const caseInvites: CaseInvite[] = await this.getAccessCode(ccdRef);
    return (
      caseInvites.find((invitee) => {
        return invitee.value.isApplicant === "Yes";
      })?.value.accessCode || ""
    );
  }

  public static async getRespondentAccessCode(ccdRef: string): Promise<string> {
    const caseInvites: CaseInvite[] = await this.getAccessCode(ccdRef);
    return (
      caseInvites.find((invitee) => {
        return invitee.value.isApplicant === "No";
      })?.value.accessCode || ""
    );
  }

  private static async getAccessCode(ccdRef: string): Promise<CaseInvite[]> {
    let caseInvites: CaseInvite[] = [];
    const apiContextSystemUser: APIRequestContext = await request.newContext();
    const apiContextS2SToken: APIRequestContext = await request.newContext();
    const tokenSystemUserCreateCase = await getAccessToken(
      "accessCode",
      apiContextSystemUser,
    );
    const microservice: string = "prl_cos_api";
    const s2sToken = await getS2SToken(apiContextS2SToken, microservice);
    const url = `${process.env.CCD_DATA_STORE_URL as string}/cases/${ccdRef}`;
    const response = await apiContextSystemUser.get(url, {
      headers: {
        Authorization: `Bearer ${tokenSystemUserCreateCase}`,
        ServiceAuthorization: `${s2sToken}`,
        experimental: "test",
      },
    });
    let responseBody;
    if (response.ok()) {
      responseBody = await response.json();
      if (responseBody.data) {
        caseInvites = responseBody.data.caseInvites;
      } else {
        throw new Error("Failed to find case data");
      }
    } else {
      throw new Error(
        `Failed to find case: ${response.status()} - ${response.statusText()}`,
      );
    }
    return caseInvites;
  }
}
