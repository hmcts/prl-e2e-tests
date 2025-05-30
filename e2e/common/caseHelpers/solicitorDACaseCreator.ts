import { Browser, Page } from "@playwright/test";
import { Helpers } from "../helpers.ts";
import {
  createTSSolicitorCase,
  JsonData,
  jsonDatas,
  submitEvent,
} from "./solicitorCaseCreatorHelper.ts";
import Config from "../../utils/config.utils.ts";

export class SolicitorDACaseCreator {
  public static async createCaseStatementOfTruthAndSubmit(
    page: Page,
    jsonData: JsonData = jsonDatas.solicitorDACaseData,
  ): Promise<string> {
    const caseRef = await createTSSolicitorCase(page, "FL401");
    await submitEvent(
      page,
      caseRef,
      "fl401StatementOfTruthAndSubmit",
      jsonData,
    );
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
