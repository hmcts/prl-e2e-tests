import { APIRequestContext, expect, request } from "@playwright/test";
import fs from "fs";
import path from "path";
import withNoticeJsonData from "../caseData/citizenDA/courtNavDaCitizenCase_WithNotice.json" with { type: "json" };
import withoutNoticeJsonData from "../caseData/citizenDA/courtNavDaCitizenCase_WithoutNotice.json" with { type: "json" };

export class CourtNavUtils {
  private apiContext: APIRequestContext;
  private token: string;
  private createCaseSubscriptionKey: string;
  private addDocSubscriptionKey: string;
  private caseUrl: string;
  private docUrl: string;

  constructor() {
    this.initializeApiClients();
    this.token = process.env.COURTNAV_CREATE_CASE_BEARER_TOKEN as string;
    this.createCaseSubscriptionKey = process.env
      .COURTNAV_SUBSCRIPTION_KEY_CREATE_CASE as string;
    this.addDocSubscriptionKey = process.env
      .COURTNAV_SUBSCRIPTION_KEY_ADD_DOC as string;
    this.caseUrl = process.env.COURTNAV_CASE_URL as string;
    this.docUrl = process.env.COURTNAV_DOC_URL as string;

    if (
      !this.token ||
      !this.createCaseSubscriptionKey ||
      !this.addDocSubscriptionKey ||
      !this.caseUrl ||
      !this.docUrl
    ) {
      throw new Error(
        "One or more required environment variables for CourtNavApiClient are not set.",
      );
    }
  }

  private async initializeApiClients() {
    this.apiContext = await request.newContext();
  }

  /**
   * Creates a DA Citizen CourtNav case and optionally adds a document.
   * @param {boolean} withNotice Determines urgency of the case (with (true) or without Notice (false))
   * @param {boolean} withDoc Whether to add a document after case creation
   * @returns {Promise<string>} The case reference if successful, otherwise throws an error
   */
  async createCase(withNotice: boolean, withDoc: boolean): Promise<string> {
    const jsonData = withNotice ? withNoticeJsonData : withoutNoticeJsonData;
    let ccd_reference = "";

    await expect
      .poll(
        async () => {
          const response = await this.apiContext.post(this.caseUrl, {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Ocp-Apim-Subscription-Key": this.createCaseSubscriptionKey,
            },
            data: jsonData,
          });

          if (response.status() !== 201) return false;
          const json = await response.json();
          if (!json.ccd_reference) return false;
          ccd_reference = json.ccd_reference;
          return true;
        },
        {
          intervals: [4000],
          timeout: 60000,
        },
      )
      .toBeTruthy();

    if (process.env.PWDEBUG) {
      console.log("CCD Reference:", ccd_reference);
    }

    if (withDoc) {
      await this.addDocumentToCase(ccd_reference);
    }

    return ccd_reference;
  }

  /**
   * Helper method to add a document to a DA CourtNav case.
   * @param {string} ccdReference The CCD reference of the created case
   */
  private async addDocumentToCase(ccdReference: string): Promise<void> {
    const courtNavAddDocURL = `${this.docUrl}${ccdReference}/document`;
    const pdfPath = path.resolve(
      import.meta.dirname,
      "../../caseData/testPdf.pdf",
    );
    const pdfBuffer = fs.readFileSync(pdfPath);

    const docResponse = await this.apiContext.post(courtNavAddDocURL, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Ocp-Apim-Subscription-Key": this.addDocSubscriptionKey,
        Accept: "*/*",
      },
      multipart: {
        typeOfDocument: "WITNESS_STATEMENT",
        file: {
          name: "testPdf.pdf",
          mimeType: "application/pdf",
          buffer: pdfBuffer,
        },
      },
    });

    const docResponseBody = await docResponse.json();
    expect(docResponse.status()).toBe(200);
    if (docResponse.status() !== 200) {
      throw new Error(
        `Failed to upload document: ${docResponseBody.message || "Unknown error"}`,
      );
    }
  }
}
