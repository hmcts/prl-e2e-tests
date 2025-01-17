import { getAccessToken, getS2SToken } from "./getAccessTokenHelper.ts";
import { APIRequestContext, Browser, request } from "@playwright/test";
import * as process from "node:process";
import {
  completeCaseEventWithContext,
  completeServiceOfApplication,
  createBlankCase,
} from "./solicitorDACaseHelperPOC.ts";

const CaseEvents: string[] = [
  "fl401TypeOfApplication",
  "withoutNoticeOrderDetails",
  "applicantsDetails",
  "respondentsDetails",
  "fl401ApplicantFamilyDetails",
  "respondentRelationship",
  "respondentBehaviour",
  "fl401OtherProceedings",
  "attendingTheHearing",
  "welshLanguageRequirements",
  "fl401UploadDocuments",
  "fl401StatementOfTruthAndSubmit",
  "fl401SendToGateKeeper",
  "serviceOfApplication",
];

export class SolicitorDACaseCreatorPOC {
  /**
   * Function to create a DA Solicitor case and complete the relevant case events from the CaseEvents list.
   * @param {Browser} browser the browser to be used if service of application needs to be completed
   * @param {string} finalCaseEvent the name of the final case event to complete for this case (based on the CaseEvents list order),
   * if no event provided then complete up to and including service of application
   * @returns {Promise<string>} the case reference if successful, otherwise throws an error
   */
  public static async createCaseAndCompleteCaseEvents(
    browser: Browser,
    finalCaseEvent: string = "",
  ): Promise<string> {
    const apiContextSolicitorCreateCase: APIRequestContext =
      await request.newContext();
    const tokenSolicitorCreateCase = await getAccessToken(
      "solicitorCreateCase",
      apiContextSolicitorCreateCase,
    );
    if (!tokenSolicitorCreateCase) {
      throw new Error("Setup failed: Unable to get bearer token.");
    }
    const apiContextS2SToken: APIRequestContext = await request.newContext();
    const microservice: string = "prl_cos_api";
    const s2sToken: string = await getS2SToken(
      apiContextS2SToken,
      microservice,
    );
    const { userID, caseRef } = await createBlankCase(
      apiContextSolicitorCreateCase,
      tokenSolicitorCreateCase,
      s2sToken,
    );
    if (process.env.PWDEBUG) {
      console.log("Case ref:", caseRef);
    }
    for (const caseEvent of CaseEvents) {
      if (caseEvent === "serviceOfApplication") {
        await completeServiceOfApplication(browser, caseRef);
      } else {
        await completeCaseEventWithContext(
          apiContextSolicitorCreateCase,
          tokenSolicitorCreateCase,
          s2sToken,
          userID,
          caseEvent,
          caseRef,
        );
      }
      if (caseEvent === finalCaseEvent) {
        break;
      }
    }
    return caseRef;
  }
}
