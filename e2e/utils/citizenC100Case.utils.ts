import json from "../caseData/citizenCA/c100-citizen-dummy-case-details.json" with { type: "json" };

import { buildSOAEventData } from "../testData/citizen.ts";
import { CommonCaseEventUtils } from "./commonCaseEvent.utils.ts";
import { UserCredentials } from "../common/types.ts";

type JsonObjectWithId = {
  id: string;
  [key: string]: unknown;
};

export interface CitizenApplicationInfo {
  orderId: string;
  applicant1Id: string;
  applicant2Id: string;
  respondent1Id: string;
  respondent2Id: string;
  otherPartyId: string;
}

export interface CaseFlagInfo {
  caseFlagName: string;
  status: string;
  partyName: string;
}

export interface CitizenUploadedDocument {
  uploader: string;
  category: string;
  fileName: string;
}

export class CitizenC100CaseUtils {
  constructor(private commonCaseEventsUtils: CommonCaseEventUtils) {}

  public async createAndSubmitCitizenCase(
    userCredentials: UserCredentials,
  ): Promise<string> {
    const bearerToken: string =
      await this.commonCaseEventsUtils.getBearerToken(userCredentials);

    const s2sToken: string = await this.commonCaseEventsUtils.getServiceToken();

    const createdCaseJsonData: JsonObjectWithId = await this.createDraftCase(
      bearerToken,
      s2sToken,
    );

    // get case number from created case data
    const caseNumber: string = String(createdCaseJsonData.id);
    if (!caseNumber) {
      throw new Error("Failed to retrieve CCD case reference");
    }

    await this.submitCitizenCase(
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
    return this.commonCaseEventsUtils.retry({
      fn: () =>
        this.commonCaseEventsUtils.withApiContext(async (api) => {
          const url = `${process.env.PRL_COS_API_URL}/testing-support/create-dummy-citizen-case-with-body`;

          const response = await api.post(url, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              ServiceAuthorization: `Bearer ${s2sToken}`,
              "Content-Type": "application/json",
            },
            data: json,
          });

          if (!response.ok()) {
            throw new Error(
              `HTTP ${response.status()} -> Failed to create draft citizen case: ${await response.text()}`,
            );
          }

          return (await response.json()) as JsonObjectWithId;
        }),
      description: "Create draft citizen case",
    });
  }

  private async submitCitizenCase(
    caseNumber: string,
    caseData: JsonObjectWithId,
    bearerToken: string,
    s2sToken: string,
  ): Promise<void> {
    await this.commonCaseEventsUtils.retry({
      fn: () =>
        this.commonCaseEventsUtils.withApiContext(async (api) => {
          const url = `${process.env.PRL_COS_API_URL}/citizen/${caseNumber}/citizen-case-submit/submit-c100-application`;

          const response = await api.post(url, {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              ServiceAuthorization: `Bearer ${s2sToken}`,
              "Content-Type": "application/json",
            },
            data: caseData,
          });

          if (!response.ok()) {
            throw new Error(
              `HTTP ${response.status()} -> Failed to submit citizen case: ${await response.text()}`,
            );
          }
        }),
      description: "Submit citizen case",
    });
  }

  public async citizenServiceOfApplication(caseId: string): Promise<void> {
    // get order and party ID's from case data and insert into json object
    const jsonCaseData = await this.commonCaseEventsUtils.getCaseInfo(caseId);
    const citizenSOACaseInfo: CitizenApplicationInfo = {
      orderId: jsonCaseData.data.orderCollection[0].id,
      applicant1Id: jsonCaseData.data.applicants[1].id,
      applicant2Id: jsonCaseData.data.applicants[0].id,
      respondent1Id: jsonCaseData.data.respondents[0].id,
      respondent2Id: jsonCaseData.data.respondents[1].id,
      otherPartyId: jsonCaseData.data.otherPartyInTheCaseRevised[0].id,
    };
    const eventData = buildSOAEventData(citizenSOACaseInfo);
    await this.commonCaseEventsUtils.completeEvent({
      caseRef: caseId,
      eventId: "serviceOfApplication",
      eventData: eventData,
      userCredentials: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  public async fetchCitizenCreatedCaseFlags(
    caseId: string,
    isApplicant: boolean,
  ): Promise<CaseFlagInfo> {
    const jsonCaseData = await this.commonCaseEventsUtils.getCaseInfo(caseId);
    const jsonCaseFlags = isApplicant
      ? jsonCaseData.data.caApplicant1ExternalFlags
      : jsonCaseData.data.caRespondent1ExternalFlags;
    return {
      caseFlagName: jsonCaseFlags.details[0].value.name,
      status: jsonCaseFlags.details[0].value.status,
      partyName: jsonCaseFlags.partyName,
    };
  }

  public async fetchCitizenUploadedDocuments(
    caseId: string,
  ): Promise<CitizenUploadedDocument> {
    const jsonCaseData = await this.commonCaseEventsUtils.getCaseInfo(caseId);
    return {
      uploader: jsonCaseData.data.citizenQuarantineDocsList[0].value.uploadedBy,
      category:
        jsonCaseData.data.citizenQuarantineDocsList[0].value.categoryName,
      fileName:
        jsonCaseData.data.citizenQuarantineDocsList[0].value
          .citizenQuarantineDocument.document_filename,
    };
  }
}
