import { Page, Browser } from "@playwright/test";
import {
  createTSSolicitorCase,
  JsonData,
  jsonDatas,
  submitEvent,
} from "./solicitorCaseCreatorHelper.ts";
import { Helpers } from "../helpers.ts";
import config from "../../utils/config.utils.ts";

export class SolicitorCACaseCreator {
  public static async createCaseSubmitAndPay(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorCACaseData,
  ): Promise<string> {
    const caseRef = await createTSSolicitorCase(page, "C100");
    await submitEvent(page, caseRef, "submitAndPay", jsonData);
    await submitEvent(
      page,
      caseRef,
      "testingSupportPaymentSuccessCallback",
      jsonData,
    );
    return caseRef;
  }

  public static async c100IssueAndSendToLocalCourt(
    browser: Browser,
    caseRef: string,
  ): Promise<void> {
    const ctscPage = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      ctscPage,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await submitEvent(
      ctscPage,
      caseRef,
      "issueAndSendToLocalCourtCallback",
      jsonDatas.solicitorCACaseData,
    );
  }
}
