import { APIRequestContext, request } from "@playwright/test";
import { TokenUtils } from "./token.utils.ts";
import { ServiceAuthUtils } from "@hmcts/playwright-common";

interface CaseInvite {
  id: string;
  value: CaseInviteDetails;
}

interface CaseInviteDetails {
  accessCode: string;
  isApplicant: string;
}

export class AccessCodeHelper {
  private apiContextSystemUser!: APIRequestContext;
  constructor(
    private serviceAuthUtils: ServiceAuthUtils,
    private tokenUtils: TokenUtils,
  ) {}

  public async initializeApiContext(): Promise<void> {
    // Only create a new context if one doesn't already exist to avoid redundant creations
    if (!this.apiContextSystemUser) {
      this.apiContextSystemUser = await request.newContext();
    }
  }

  public async getApplicantAccessCode(ccdRef: string): Promise<string> {
    const caseInvites: CaseInvite[] = await this.getAccessCode(ccdRef);
    return (
      caseInvites.find((invitee) => {
        return invitee.value.isApplicant === "Yes";
      })?.value.accessCode || ""
    );
  }

  public async getRespondentAccessCode(ccdRef: string): Promise<string> {
    const caseInvites: CaseInvite[] = await this.getAccessCode(ccdRef);
    return (
      caseInvites.find((invitee) => {
        return invitee.value.isApplicant === "No";
      })?.value.accessCode || ""
    );
  }

  private async getAccessCode(ccdRef: string): Promise<CaseInvite[]> {
    if (!this.apiContextSystemUser) {
      await this.initializeApiContext();
    }
    let caseInvites: CaseInvite[] = [];
    const tokenSystemUserCreateCase =
      await this.tokenUtils.getAccessToken("accessCode");
    const s2sToken = process.env.S2S_TOKEN as string;
    const url = `${process.env.CCD_DATA_STORE_URL as string}/cases/${ccdRef}`;
    const response = await this.apiContextSystemUser.get(url, {
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
