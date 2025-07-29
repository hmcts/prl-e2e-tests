import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { StatementOfService1Page } from "../../../../pages/manageCases/caseProgression/statementOfService/statementOfService1Page.ts";
import { StatementOfServiceSubmitPage } from "../../../../pages/manageCases/caseProgression/statementOfService/StatementOfServiceSubmitPage.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";
import { completeEventsUpToServiceOfApplication } from "../../../../common/caseHelpers/caseEventsHelper.ts";
import {
  applicationSubmittedBy,
  createOrderFL401Options,
} from "../../../../common/types.ts";

interface statementOfServiceParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
  createOrderFL401Options: createOrderFL401Options;
  applicationSubmittedBy: applicationSubmittedBy;
}

export class StatementOfService {
  public static async statementOfService({
    page,
    accessibilityTest,
    ccdRef,
    browser,
    manageOrderData,
    createOrderFL401Options,
    applicationSubmittedBy,
  }: statementOfServiceParams): Promise<void> {
    await completeEventsUpToServiceOfApplication(
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
}
