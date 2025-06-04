import { APIRequestContext, expect, request } from "@playwright/test";
import fs from "fs";
import path from "path";
import withNoticeJsonData from "../../caseData/citizenDA/courtNavDaCitizenCase_WithNotice.json" with { type: "json" };
import withoutNoticeJsonData from "../../caseData/citizenDA/courtNavDaCitizenCase_WithoutNotice.json" with { type: "json" };

/**
 * Function to create a DA Citizen CourtNav case and optionally add a document.
 * @param {boolean} withNotice Determines urgency of the case (with (true) or without Notice (false))
 * @param {boolean} withDoc Whether to add a document after case creation
 * @returns {Promise<string>} The case reference if successful, otherwise throws an error
 */
async function createDaCitizenCourtNavCase(
  withNotice: boolean,
  withDoc: boolean,
): Promise<string> {
  const apiContext: APIRequestContext = await request.newContext();
  const token = process.env.COURTNAV_CREATE_CASE_BEARER_TOKEN as string;
  const subscriptionKey = process.env
    .COURTNAV_SUBSCRIPTION_KEY_CREATE_CASE as string;
  const caseUrl = process.env.COURTNAV_CASE_URL as string;
  const jsonData = withNotice ? withNoticeJsonData : withoutNoticeJsonData;
  let ccd_reference = "";
  await expect
    .poll(
      async () => {
        const response = await apiContext.post(caseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Ocp-Apim-Subscription-Key": subscriptionKey,
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
    await addDocumentToCase(token, ccd_reference);
  }
  return ccd_reference;
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
  const pdfPath = path.resolve(
    import.meta.dirname,
    "../../caseData/testPdf.pdf",
  );
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
  expect(docResponse.status()).toBe(200);
  if (docResponse.status() !== 200) {
    throw new Error(
      `Failed to upload document: ${docResponseBody.message || "Unknown error"}`,
    );
  }
}
export default createDaCitizenCourtNavCase;
