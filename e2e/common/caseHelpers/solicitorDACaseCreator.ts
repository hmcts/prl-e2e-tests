import { Browser, Page } from "@playwright/test";
import { Helpers } from "../helpers.ts";
import {
  createBlankCase,
  JsonData,
  jsonDatas,
  submitEvent,
} from "./solicitorCaseCreatorHelper.ts";
import { solicitorDACaseAPIEvent } from "../types.ts";
import Config from "../../utils/config.ts";

const solicitorCaseEvents: solicitorDACaseAPIEvent[] = [
  "fl401TypeOfApplication",
  "withoutNoticeOrderDetails",
  "applicantsDetails",
  "respondentsDetails",
  "fl401ApplicantFamilyDetails",
  "respondentRelationship",
  "respondentBehaviour",
  "fl401Home",
  "welshLanguageRequirements",
  "fl401StatementOfTruthAndSubmit",
  "fl401SendToGateKeeper",
  "serviceOfApplication",
];

export class SolicitorDACaseCreator {
  public static async createCaseStatementOfTruthAndSubmit(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorDACaseData,
  ): Promise<string> {
    const caseRef: string = await createBlankCase(page, jsonData);
    for (const event of solicitorCaseEvents) {
      await submitEvent(page, caseRef, event, jsonData);
      if (event === "fl401StatementOfTruthAndSubmit") {
        break;
      }
    }
    return caseRef;
  }

  public static async createCaseSendToGatekeeper(
    page: Page,
    browser: Browser,
  ): Promise<string> {
    const caseRef: string =
      await this.createCaseStatementOfTruthAndSubmit(page);
    // open new browser and sign in as court admin user
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
    await submitEvent(caPage, caseRef, "fl401SendToGateKeeper");
    return caseRef;
  }

  public static async createCaseSOA(
    page: Page,
    browser: Browser,
  ): Promise<string> {
    const caseRef: string =
      await this.createCaseStatementOfTruthAndSubmit(page);
    // open new browser and sign in as court admin user
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
    await submitEvent(caPage, caseRef, "fl401SendToGateKeeper");
    await submitEvent(caPage, caseRef, "serviceOfApplication");
    return caseRef;
  }
}
