import { APIRequestContext, APIResponse, request } from "@playwright/test";
import json from "../caseData/citizenCA/c100-citizen-dummy-case-details.json" with { type: "json" };
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";

type JsonObjectWithId = {
  id: string;
  [key: string]: unknown;
};

interface UserInfo {
  email: string;
  password: string;
}

interface EventRequestParams {
  caseId: string;
  eventId: string;
  eventData: Record<string, unknown>;
  userInfo: UserInfo;
}

interface CitizenApplicationInfo {
  orderId: string;
  applicant1Id: string;
  applicant2Id: string;
  respondent1Id: string;
  respondent2Id: string;
  otherPartyId: string;
}

// TODO: what to do about event data rather than keeping it in the methods??
// TODO: need to enable for demo environment as well
// TODO: make logging less verbose??
export class CitizenC100CaseUtils {
  constructor(
    private serviceAuthUtils: ServiceAuthUtils,
    private idamUtils: IdamUtils,
  ) {}

  public async createAndSubmitCitizenCase(userInfo: UserInfo): Promise<string> {
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

    await this.retry(async () => {
      const apiContext = await this.createApiContext();
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
    await this.retry(async () => {
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
        throw new Error(
          `Failed to submit case: ${responseCreateCase.status()} - ${await responseCreateCase.text()}`,
        );
      }
    });
  }

  public async issueAndSendToLocalCourt(caseId: string): Promise<void> {
    const eventData = {
      data: {
        courtList: {
          value: {
            code: "827534:",
            label: "Aberystwyth Justice Centre - Trefechan - SY23 1AS",
          },
          list_items: [
            {
              code: "827534:",
              label: "Aberystwyth Justice Centre - Trefechan - SY23 1AS",
            },
            {
              code: "257431:",
              label:
                "Bury St Edmunds County Court and Family Court - St Andrews Street North - IP33 1TR",
            },
            {
              code: "101959:",
              label:
                "Carmarthen County Court and Family Court - The Hearing Centre, Hill House, Picton Terrace, Carmarthen - SA31 3BT",
            },
            {
              code: "816875:",
              label:
                "Chelmsford County and Family Court - Priory Place - CM2 0PP",
            },
            {
              code: "497679:Coventryprivatelawapplications@justice.gov.uk",
              label:
                "Coventry Combined Court Centre - Much Park Street, Coventry - CV1 2SN",
            },
            {
              code: "758998:",
              label:
                "Dudley County (and Magistrates) Court - The Court House, The Inhedge - DY1 1RY",
            },
            {
              code: "898213:eastlondonfamilypr@justice.gov.uk",
              label:
                "East London Family Court - Westferry Circus (Westferry House), Part Ground, 6th And 7th Floors, 11 Westferry Circus, Canary Wharf, London, E14 4HE - E14 4HD",
            },
            {
              code: "735217:family.exeter.countycourt@justice.gov.uk",
              label:
                "Exeter Combined Court Centre - Southernhay Gardens, Exeter - EX1 1UH",
            },
            {
              code: "198592:family.gloucester.countycourt@justice.gov.uk",
              label:
                "Gloucestershire Family and Civil Court - Kimbrose Way, Gloucester Docks - GL1 2DE",
            },
            {
              code: "478126:",
              label:
                "Grimsby Combined Court Centre - Town Hall Square - DN31 1HX",
            },
            {
              code: "700596:",
              label:
                "Haverfordwest County and Family - Penffynnon, Hawthorn Rise - SA61 2AZ",
            },
            {
              code: "471349:",
              label:
                "Ipswich County Court and Family Hearing Centre - Arcade Street - IP1 1EJ",
            },
            {
              code: "195520:",
              label:
                "Kingston-upon-Hull Combined Court Centre - The Combined Court Centre - HU1 2EZ",
            },
            {
              code: "195465:PLP.LINCOLN@justice.gov.uk",
              label:
                "Lincoln County Court and Family Court - High Street - LN5 7PS",
            },
            {
              code: "390932:",
              label:
                "Llanelli Law Courts - Town Hall Square, Llanelli - SA15 3AW",
            },
            {
              code: "487294:KentPRL@justice.gov.uk",
              label:
                "Medway County Court and Family Court - 47-67 High Street Chatham Kent - ME4 4DW",
            },
            {
              code: "366796:newcastle.c100applications@justice.gov.uk",
              label:
                "Newcastle Civil & Family Courts and Tribunals Centre - Barras Bridge, Newcastle-Upon-Tyne - NE99 1NA",
            },
            {
              code: "471569:family.peterborough.countycourt@justice.gov.uk",
              label:
                "Peterborough Combined Court Centre - Crown Buildings, Rivergate - PE1 1EJ",
            },
            {
              code: "846055:",
              label: "Port Talbot Justice Centre - Harbourside Road - SA13 1SB",
            },
            {
              code: "43104:family.southampton.countycourt@justice.gov.uk",
              label:
                "Southampton Combined Court Centre - The Courts of Justice, London Road - SO15 2XQ",
            },
            {
              code: "781139:",
              label:
                "Southend Court House: County Court and Family Court and Magistrates' Court - Victoria Avenue, The Court House - SS2 6EG",
            },
            {
              code: "234946:",
              label:
                "Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP",
            },
            {
              code: "292771:",
              label:
                "Telford Justice Centre - Telford Square, Malinsgate - TF3 4HX",
            },
            {
              code: "177463:",
              label:
                "Walsall County and Family Court - Bridge Street, Bridge House - WS1 1JQ",
            },
            {
              code: "41047:",
              label:
                "Wolverhampton Combined Court Centre - Pipers Row, Wolverhampton - WV1 3LQ",
            },
          ],
        },
      },
    };
    await this.completeEvent({
      caseId: caseId,
      eventId: "issueAndSendToLocalCourtCallback",
      eventData: eventData,
      userInfo: {
        email: process.env.COURT_ADMIN_STOKE_USERNAME as string,
        password: process.env.COURT_ADMIN_STOKE_PASSWORD as string,
      },
    });
  }

  public async sendToGatekeeper(caseId: string): Promise<void> {
    const eventData = {
      data: {
        isSpecificGateKeeperNeeded: "No",
      },
    };
    await this.completeEvent({
      caseId: caseId,
      eventId: "sendToGateKeeper",
      eventData: eventData,
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  public async manageOrdersCreateOrder(caseId: string): Promise<void> {
    const eventData = {
      data: {
        manageOrderHeader1: null,
        caseTypeOfApplication: "C100",
        manageOrdersOptions: "createAnOrder",
        performingUser: null,
        performingAction: null,
        judgeLaReviewRequired: null,
        isHearingTaskNeeded: null,
        hearingOptionSelected: null,
        isOrderApproved: null,
        whoApprovedTheOrder: null,
        isMultipleHearingSelected: null,
        judgeLaManagerReviewRequired: null,
        isSdoSelected: "No",
        sdoPreamblesTempList: null,
        sdoCafcassOrCymruTempList: null,
        sdoLocalAuthorityTempList: null,
        sdoCourtTempList: null,
        sdoDocumentationAndEvidenceTempList: null,
        sdoOtherTempList: null,
        listElementsSetToDefaultValue: null,
        sdoHearingsAndNextStepsTempList: null,
        draftOrderCollectionId: null,
        requestSafeGuardingLetterUpdate: null,
        safeGuardingLetterUploadDueDate: null,
        loggedInUserType: "COURT_ADMIN",
        isInvokedFromTask: "No",
        createSelectOrderOptions: "parentalResponsibility",
        selectedOrder:
          "<span class='heading-h3'>Parental responsibility order (C45A)\n\n</span>",
        typeOfC21Order: "",
        daOrderForCaCase: "No",
        isTheOrderByConsent: "Yes",
        wasTheOrderApprovedAtHearing: "No",
        judgeOrMagistrateTitle: "herHonourJudge",
        judgeOrMagistratesLastName: "Test Judge Name",
        justiceLegalAdviserFullName: null,
        dateOrderMade: "2026-02-09",
        isTheOrderAboutAllChildren: "Yes",
        recitalsOrPreamble: null,
        orderDirections: null,
        parentName: "John Doe",
        previewOrderDocWelsh: {
          document_url:
            "http://dm-store-aat.service.core-compute-aat.internal/documents/e964841f-a497-4f3d-af8c-67ff183f8f18",
          document_binary_url:
            "http://dm-store-aat.service.core-compute-aat.internal/documents/e964841f-a497-4f3d-af8c-67ff183f8f18/binary",
          document_filename:
            "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
        },
        previewOrderDoc: {
          document_url:
            "http://dm-store-aat.service.core-compute-aat.internal/documents/c5a50165-fbfe-4400-9bae-48111b82a75f",
          document_binary_url:
            "http://dm-store-aat.service.core-compute-aat.internal/documents/c5a50165-fbfe-4400-9bae-48111b82a75f/binary",
          document_filename: "Parental_Responsibility_Order_C45A_draft.pdf",
        },
        amendOrderSelectCheckOptions: "noCheck",
        selectTypeOfOrder: "general",
        cafcassOrCymruNeedToProvideReport: "No",
        orderEndsInvolvementOfCafcassOrCymru: "No",
        doYouWantToServeOrder: "No",
        whatDoWithOrder: "finalizeSaveToServeLater",
      },
    };
    await this.completeEvent({
      caseId: caseId,
      eventId: "manageOrders",
      eventData: eventData,
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

  public async serviceOfApplication(caseId: string): Promise<void> {
    // get order and party ID's from case data and insert into json object
    const jsonCaseData = await this.getCaseInfo(caseId);
    const citizenSOACaseInfo: CitizenApplicationInfo = {
      orderId: jsonCaseData.data.orderCollection[0].id,
      applicant1Id: jsonCaseData.data.applicants[1].id,
      applicant2Id: jsonCaseData.data.applicants[0].id,
      respondent1Id: jsonCaseData.data.respondents[0].id,
      respondent2Id: jsonCaseData.data.respondents[1].id,
      otherPartyId: jsonCaseData.data.otherPartyInTheCaseRevised[0].id,
    };
    const eventData = {
      data: {
        serviceOfApplicationHeader: null,
        isConfidential: "No",
        sentDocumentPlaceHolder:
          "<details class='govuk-details'>\n\n<summary class='govuk-details__summary'>\n\n<h3 class='govuk-details__summary-text'>\n\nDocuments served in the pack\n\n</h3>\n\n</summary>\n\n<div class='govuk-details__text'>\n\nCertain documents will be automatically included in the pack this is served on parties(the people in the case)\n\nThis includes\n\n<ul><li>C100</li><li>C1A</li><li>C7</li><li>C1A (if applicable)</li><li>C8 (Cafcass/Cafcass Cymru, if applicable)</li>\n\n<li>Any orders and hearing notices created at the initial gatekeeping stage</li></ul>\n\nYou do not need to upload these documents yourself\n\n</div>\n\n</details>",
        serviceOfApplicationScreen1: {
          value: [
            {
              code: citizenSOACaseInfo.orderId,
              label: "Parental responsibility order (C45A) - 9 Feb 2026",
            },
          ],
          list_items: [
            {
              code: citizenSOACaseInfo.orderId,
              label: "Parental responsibility order (C45A) - 9 Feb 2026",
            },
          ],
        },
        specialArrangementsLetter: {
          document_url:
            "http://dm-store-aat.service.core-compute-aat.internal/documents/5417e28b-d4a0-4c41-8194-d133c50e2297",
          document_binary_url:
            "http://dm-store-aat.service.core-compute-aat.internal/documents/5417e28b-d4a0-4c41-8194-d133c50e2297/binary",
          document_filename: "Special arrangements letter.docx",
        },
        additionalDocumentsList: [],
        caseTypeOfApplication: "C100",
        soaIsOrderListEmpty: "No",
        missingAddressWarningText:
          "<div class='govuk-warning-text'><span class='govuk-warning-text__icon' aria-hidden='true'>!</span><strong class='govuk-warning-text__text'>There is no postal address for a respondent and other people in the case</strong></div>",
        displayLegalRepOption: "No",
        isC8CheckNeeded: null,
        responsibleForService: null,
        isOccupationOrderSelected: null,
        isApplicantRepresented: null,
        productHearingBundleOn: null,
        soaServeToRespondentOptions: "No",
        soaRecipientsOptions: {
          value: [
            {
              code: citizenSOACaseInfo.applicant1Id,
              label: "John Doe (Applicant 1)",
            },
            {
              code: citizenSOACaseInfo.applicant2Id,
              label: "Martina Graham (Applicant 2)",
            },
            {
              code: citizenSOACaseInfo.respondent1Id,
              label: "Mary Richards (Respondent 1)",
            },
            {
              code: citizenSOACaseInfo.respondent2Id,
              label: "David Carmen (Respondent 2)",
            },
          ],
          list_items: [
            {
              code: citizenSOACaseInfo.applicant1Id,
              label: "John Doe (Applicant 1)",
            },
            {
              code: citizenSOACaseInfo.applicant2Id,
              label: "Martina Graham (Applicant 2)",
            },
            {
              code: citizenSOACaseInfo.respondent1Id,
              label: "Mary Richards (Respondent 1)",
            },
            {
              code: citizenSOACaseInfo.respondent2Id,
              label: "David Carmen (Respondent 2)",
            },
          ],
        },
        soaOtherParties: {
          value: [],
          list_items: [
            {
              code: citizenSOACaseInfo.otherPartyId,
              label: "Andrew Smith",
            },
          ],
        },
        soaCafcassCymruServedOptions: "No",
        soaServeLocalAuthorityYesOrNo: "No",
      },
    };
    await this.completeEvent({
      caseId: caseId,
      eventId: "serviceOfApplication",
      eventData: eventData,
      userInfo: {
        email: process.env.CASEWORKER_USERNAME as string,
        password: process.env.CASEWORKER_PASSWORD as string,
      },
    });
  }

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

  private async getCaseInfo(caseId: string) {
    const bearerToken: string = await this.getBearerToken({
      email: process.env.CCD_DATA_STORE_CLIENT_USERNAME as string,
      password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD as string,
    });
    let response: APIResponse;

    await this.retry(async () => {
      const serviceToken: string = await this.getServiceToken("prl_cos_api");

      const apiContext = await this.createApiContext();
      const url = `${process.env.CCD_DATA_STORE_URL as string}/cases/${caseId}`;
      response = await apiContext.get(url, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ServiceAuthorization: `Bearer ${serviceToken}`,
          Experimental: "true",
        },
      });

      if (!response.ok()) {
        throw new Error(
          `Failed to get case info: ${response.status()} - ${await response.text()}`,
        );
      }
    });

    return await response.json();
  }

  private async completeEvent({
    caseId,
    eventId,
    eventData,
    userInfo,
  }: EventRequestParams): Promise<void> {
    const bearerToken: string = await this.getBearerToken(userInfo);
    const serviceToken: string = await this.getServiceToken();
    const userId: string = await this.getUserId(userInfo.email);
    const eventToken: string = await this.getEventToken(
      caseId,
      eventId,
      bearerToken,
      serviceToken,
      userId,
    );

    // append the end of the event json because it is always the same apart from the eventId and eventToken
    const eventJson = {
      event: {
        id: eventId,
        summary: "",
        description: "",
      },
      event_token: eventToken,
      ignore_warning: false,
    };

    await this.submitEvent(
      caseId,
      JSON.stringify({ ...eventData, ...eventJson }),
      bearerToken,
      serviceToken,
      userId,
    );
  }

  private async submitEvent(
    caseId: string,
    eventData: string,
    bearerToken: string,
    serviceToken: string,
    userId: string,
  ): Promise<void> {
    await this.retry(async () => {
      const apiContext = await this.createApiContext();
      const submitEventUrl = `${process.env.CCD_DATA_STORE_URL as string}/caseworkers/${userId}/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases/${caseId}/events`;
      const response = await apiContext.post(submitEventUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ServiceAuthorization: `Bearer ${serviceToken}`,
          "Content-Type": "application/json; charset=UTF-8",
          Experimental: "true",
        },
        data: eventData,
      });

      if (!response.ok()) {
        throw new Error(
          `Failed to submit event: ${response.status()} - ${await response.text()}`,
        );
      }
    });
  }

  private async getEventToken(
    caseId: string,
    eventId: string,
    bearerToken: string,
    serviceToken: string,
    userId: string,
  ): Promise<string> {
    const apiContext = await this.createApiContext();
    const eventTokenUrl = `${process.env.CCD_DATA_STORE_URL as string}/caseworkers/${userId}/jurisdictions/PRIVATELAW/case-types/PRLAPPS/cases/${caseId}/event-triggers/${eventId}/token`;
    const response = await apiContext.get(eventTokenUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        ServiceAuthorization: `Bearer ${serviceToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok()) {
      throw new Error(
        `Failed to get event token: ${response.status()} - ${await response.text()}`,
      );
    }

    const responseJson = await response.json();
    return responseJson.token;
  }

  private async getBearerToken(userInfo: UserInfo): Promise<string> {
    return await this.idamUtils.generateIdamToken({
      grantType: "password",
      username: userInfo.email,
      password: userInfo.password,
      scope: "openid profile roles",
      clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
      clientSecret: process.env.IDAM_SECRET as string,
      redirectUri: process.env.MANAGE_CASE_REDIRECT_URI as string,
    });
  }

  private async getUserId(email: string): Promise<string> {
    const bearerToken = await this.getBearerToken({
      email: process.env.CCD_DATA_STORE_CLIENT_USERNAME,
      password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD,
    });

    const apiContext = await this.createApiContext();
    const eventTokenUrl = `${process.env.IDAM_TESTING_SUPPORT_USERS_URL as string}?email=${email}`;
    const response = await apiContext.get(eventTokenUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok()) {
      throw new Error(
        `Failed to get user ID: ${response.status()} - ${await response.text()}`,
      );
    }

    const responseJson = await response.json();
    return responseJson.id;
  }

  private async getServiceToken(
    microservice: string = "ccd_data",
  ): Promise<string> {
    return await this.serviceAuthUtils.retrieveToken({
      microservice: microservice,
    });
  }

  private async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext();
  }

  private async retry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delayMs = 500,
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;

        if (attempt < retries) {
          await new Promise((res) => setTimeout(res, delayMs * attempt));
        }
      }
    }

    throw lastError;
  }
}
