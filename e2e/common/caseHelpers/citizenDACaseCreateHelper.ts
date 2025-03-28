import { APIRequestContext, expect, request } from "@playwright/test";
import fs from "fs";
import path from "path";
import withNoticeJsonData from "../../caseData/citizenDA/courtNavDaCitizenCase_WithNotice.json";
import withoutNoticeJsonData from "../../caseData/citizenDA/courtNavDaCitizenCase_WithoutNotice.json";
/**
 * Function to create a DA Citizen CourtNav case and optionally add a document.
 * @param {boolean} withDoc Whether to add a document after case creation
 * @param {boolean} withNotice Determines urgency of the case (with (true) or without Notice (false)
 * @returns {Promise<string>} The case reference if successful, otherwise throws an error
 */
async function createDaCitizenCourtNavCase(
  withNotice: boolean,
  withDoc: boolean,
): Promise<string> {
  const apiContextDaCreateCase2: APIRequestContext = await request.newContext();
  const tokenDaCreateCase = process.env
    .COURTNAV_CREATE_CASE_BEARER_TOKEN as string;
  let jsonData;
  if (withNotice) {
    jsonData = withNoticeJsonData;
  } else {
    jsonData = withoutNoticeJsonData;
  }
  try {
    const response = await apiContextDaCreateCase2.post(
      process.env.COURTNAV_CASE_URL as string,
      {
        headers: {
          Authorization: `Bearer ${tokenDaCreateCase}`,
          "Ocp-Apim-Subscription-Key": process.env
            .COURTNAV_SUBSCRIPTION_KEY_CREATE_CASE as string,
        },
        data: jsonData,
      },
    );
    const responseBody = await response.json();
    if (!responseBody || !responseBody.ccd_reference) {
      throw new Error(
        "Failed to create case. No CCD reference or no response body",
      );
    }
    const ccd_reference = responseBody.ccd_reference as string;
    if (process.env.PWDEBUG) {
      console.log("CCD Reference:", ccd_reference);
    }
    if (withDoc) {
      await addDocumentToCase(tokenDaCreateCase, ccd_reference);
    }
    return ccd_reference;
  } catch (error) {
    throw new Error(
      `Error creating DA Citizen CourtNav case: ${error instanceof Error ? error.message : error}`,
    );
  }
}

/**
 * Helper function to add a document to a DA CourtNav case.
 * @param {string} tokenDaCreateCase The bearer token for authentication
 * @param {string} ccdReference The CCD reference of the created case
 */
async function addDocumentToCase(
  tokenDaCreateCase: string,
  ccdReference: string,
): Promise<void> {
  const apiContextDaAddDoc: APIRequestContext = await request.newContext();
  const courtNavAddDocURL = `${process.env.COURTNAV_DOC_URL}${ccdReference}/document`;
  const pdfPath = path.resolve(__dirname, "../../caseData/testPdf.pdf");
  const pdfBuffer = fs.readFileSync(pdfPath);

  const docResponse = await apiContextDaAddDoc.post(courtNavAddDocURL, {
    headers: {
      Authorization: `Bearer ${tokenDaCreateCase}`,
      "Ocp-Apim-Subscription-Key": process.env
        .COURTNAV_SUBSCRIPTION_KEY_ADD_DOC as string,
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
  if (docResponse.status() !== 200) {
    throw new Error(
      `Failed to upload document: ${docResponseBody.message || "Unknown error"}`,
    );
  }
  expect(docResponse.status()).toBe(200);
}
export default createDaCitizenCourtNavCase;
