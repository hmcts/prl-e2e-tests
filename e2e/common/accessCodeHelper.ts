import { APIRequestContext, request } from "@playwright/test";
import { getAccessToken, getS2SToken } from "./getAccessTokenHelper";

export class AccessCodeHelper {
  public static async getApplicantAccessCode(ccdRef: string): Promise<any> {
    const caseInvites: any[] = await this.getAccessCode(ccdRef);
    const respondent: any = caseInvites.find(invitee => {
      return invitee.value.isApplicant === 'Yes';
    });
    return respondent.value.accessCode;
  }

  public static async getRespondentAccessCode(ccdRef: string) {
    const caseInvites: any[] = await this.getAccessCode(ccdRef);
    const respondent: any = caseInvites.find(invitee => {
      return invitee.value.isApplicant === 'No';
    });
    return respondent.value.accessCode;
  }

  private static async getAccessCode(
    ccdRef: string
  ): Promise<any[]> {
    let caseInvites: any[] = [];
    const apiContextSystemUser: APIRequestContext = await request.newContext();
    const apiContextS2SToken: APIRequestContext = await request.newContext();
    const tokenSystemUserCreateCase = await getAccessToken(
      "accessCode",
      apiContextSystemUser,
    );
    const s2sToken = await getS2SToken(apiContextS2SToken, "prl_cos_api");
    const url = `${process.env.ACCESS_CODE_URL as string}${ccdRef}`;
    const response = await apiContextSystemUser.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${tokenSystemUserCreateCase}`,
          ServiceAuthorization: `${s2sToken}`,
          experimental: "test",
        }
      },
    );
    let responseBody;
    if (response.ok()) {
      responseBody = await response.json();
      if(responseBody.data) {
        caseInvites = responseBody.data.caseInvites;
      } else {
        throw new Error(
          "Failed to find case data",
        );
      }
    } else {
      throw new Error(
        `Failed to find case: ${response.status()} - ${response.statusText()}`,
      );
    }
    return caseInvites;
  }
}