import { APIResponse } from "@playwright/test";
import json from "../caseData/citizenCA/c100-citizen-dummy-case-details.json" with { type: "json" };

import {
  buildSOAEventData,
  issueAndSendToLocalCourtEventData,
  manageOrdersEventData,
  sendToGatekeeperEventData,
} from "../testData/citizen.js";
import { CommonCaseEventUtils, UserInfo } from "./commonCaseEvent.utils.js";

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

  public async setupCitizenC100Application(
    userInfo: UserInfo,
  ): Promise<string> {
    const caseId = await this.createAndSubmitCitizenCase(userInfo);
    await this.issueAndSendToLocalCourt(caseId);
    await this.sendToGatekeeper(caseId);
    await this.manageOrdersCreateOrder(caseId);
    await this.serviceOfApplication(caseId);
    return caseId;
  }

  public async createAndSubmitCitizenCase(userInfo: UserInfo): Promise<string> {
    const bearerToken: string =
      await this.commonCaseEventsUtils.getBearerToken(userInfo);

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
    let response: APIResponse;

    await this.commonCaseEventsUtils.retry(async () => {
      const apiContext = await this.commonCaseEventsUtils.createApiContext();
      const caseData = json;
      const urlCreateCase = `${process.env.PRL_COS_API_URL as string}/testing-support/create-dummy-citizen-case-with-body`;
      response = await apiContext.post(urlCreateCase, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ServiceAuthorization: `Bearer ${s2sToken}`,
          "Content-Type": "application/json",
        },
        data: caseData,
      });

      if (!response.ok()) {
        throw new Error(
          `Failed to create case: ${response.status()} - ${await response.text()}`,
        );
      }
    });

    return await response.json();
  }

  private async submitCitizenCase(
    caseNumber: string,
    caseData: JsonObjectWithId,
    bearerToken: string,
    s2sToken: string,
  ): Promise<void> {
    await this.commonCaseEventsUtils.retry(async () => {
      const apiContext = await this.commonCaseEventsUtils.createApiContext();
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
        throw new Error(
          `Failed to submit case: ${responseCreateCase.status()} - ${await responseCreateCase.text()}`,
        );
      }
    });
  }

  public async issueAndSendToLocalCourt(caseId: string): Promise<void> {
    await this.commonCaseEventsUtils.completeEvent({
      caseId: caseId,
      eventId: "issueAndSendToLocalCourtCallback",
      eventData: issueAndSendToLocalCourtEventData,
      userInfo: {
        email: process.env.COURT_ADMIN_STOKE_USERNAME as string,
        password: process.env.COURT_ADMIN_STOKE_PASSWORD as string,
      },
    });
  }

  public async sendToGatekeeper(caseId: string): Promise<void> {
    await this.commonCaseEventsUtils.completeEvent({
      caseId: caseId,
      eventId: "sendToGateKeeper",
      eventData: sendToGatekeeperEventData,
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  public async manageOrdersCreateOrder(caseId: string): Promise<void> {
    await this.commonCaseEventsUtils.completeEvent({
      caseId: caseId,
      eventId: "manageOrders",
      eventData: manageOrdersEventData,
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  public async serviceOfApplication(caseId: string): Promise<void> {
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
      caseId: caseId,
      eventId: "serviceOfApplication",
      eventData: eventData,
      userInfo: {
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
