import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { StatementOfService1Page } from "../../../../pages/manageCases/caseProgression/statementOfService/statementOfService1Page.ts";
import { StatementOfServiceSubmitPage } from "../../../../pages/manageCases/caseProgression/statementOfService/StatementOfServiceSubmitPage.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";
import {
  c100CompleteEventsUpToServiceOfApplication,
  fl401CompleteEventsUpToServiceOfApplication,
} from "../../../../common/caseHelpers/caseEventsHelper.ts";
import {
  applicationSubmittedBy,
  createOrderFL401Options,
} from "../../../../common/types.ts";

interface fl401StatementOfServiceParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
  createOrderFL401Options: createOrderFL401Options;
  applicationSubmittedBy: applicationSubmittedBy;
}

interface c100StatementOfServiceParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
  applicationSubmittedBy: applicationSubmittedBy;
}

export class StatementOfService {
  public static async FL401statementOfService({
    page,
    accessibilityTest,
    ccdRef,
    browser,
    manageOrderData,
    createOrderFL401Options,
    applicationSubmittedBy,
  }: fl401StatementOfServiceParams): Promise<void> {
    await fl401CompleteEventsUpToServiceOfApplication(
      page,
      browser,
      ccdRef,
      manageOrderData,
      createOrderFL401Options,
      applicationSubmittedBy,
    );
    await page.reload();
    await Helpers.chooseEventFromDropdown(page, "Statement of service");
    await StatementOfService1Page.statementOfService1Page({
      page,
      accessibilityTest,
    });
    await StatementOfServiceSubmitPage.statementOfServiceSubmitPage({
      page,
      accessibilityTest,
    });
  }

  public static async C100StatementOfService({
    page,
    accessibilityTest,
    ccdRef,
    browser,
    manageOrderData,
    applicationSubmittedBy,
  }: c100StatementOfServiceParams): Promise<void> {
    await c100CompleteEventsUpToServiceOfApplication(
      page,
      ccdRef,
      browser,
      manageOrderData,
      applicationSubmittedBy,
    );
    await page.reload();
    await Helpers.chooseEventFromDropdown(page, "Statement of service");
    await StatementOfService1Page.statementOfService1Page({
      page,
      accessibilityTest,
    });
    await StatementOfServiceSubmitPage.statementOfServiceSubmitPage({
      page,
      accessibilityTest,
    });
  }
}
