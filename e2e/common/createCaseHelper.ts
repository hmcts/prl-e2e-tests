import { APIRequestContext, expect, request } from "@playwright/test";
import fs, { existsSync } from "fs";
import path from "path";
import { getAccessToken } from "./getAccessTokenHelper";
import jsonData from "../caseData/citizenDA/courtNavDaCitizenCase.json";

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
    if (existsSync(".env")) {
      console.log("CCD_ref:", ccd_reference);
    }
    if (withDoc && ccd_reference) {
      const apiContextDaAddDoc: APIRequestContext = await request.newContext();
      const courtNavAddDocURL = `${process.env.COURTNAV_DOC_URL}${ccd_reference}/document`;
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
      await docResponse.json();
      expect(docResponse.status()).toBe(200); // Replace with the expected status code
    } else {
      console.error("ccd_reference is undefined, cannot add a document");
    }
  } catch (error) {
    console.error("Error sending request:", error);
  }
}

export default createDaCitizenCourtNavCase;
