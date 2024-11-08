import { APIRequestContext, expect, request } from "@playwright/test";
import fs, { existsSync } from "fs";
import path from "path";
import { getAccessToken } from "./getAccessTokenHelper";
import jsonData from "../caseData/citizenDA/courtNavDaCitizenCase.json";

/**
 * Function to create a DA Citizen CourtNav case and optionally add a document.
 * @param {boolean} withDoc Whether to add a document after case creation
 */
async function createDaCitizenCourtNavCase(withDoc: boolean): Promise<void> {
  const apiContextDaCreateCase: APIRequestContext = await request.newContext();
  const tokenDaCreateCase = await getAccessToken(
    "daCourtNavCreateCase",
    apiContextDaCreateCase,
  );
  if (!tokenDaCreateCase) {
    throw new Error("Setup failed: Unable to get bearer token.");
  }
  process.env.COURTNAV_CREATE_CASE_BEARER_TOKEN = tokenDaCreateCase;
  try {
    const response = await apiContextDaCreateCase.post(
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
    const ccd_reference = responseBody.ccd_reference as string;
    if (!responseBody || !responseBody.ccd_reference) {
      throw new Error("Failed to create case. No CCD reference or no response body");
    }
    if (existsSync(".env")) {
      console.log("CCD Reference:", ccd_reference);
    }
    if (withDoc) {
      await addDocumentToCase(tokenDaCreateCase, ccd_reference);
    }
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
  const pdfPath = path.resolve(__dirname, "../caseData/testPdf.pdf");
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
