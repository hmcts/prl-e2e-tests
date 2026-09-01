import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { StatementOfService1Page } from "../../../../pages/manageCases/caseProgression/statementOfService/statementOfService1Page.ts";
import { StatementOfServiceSubmitPage } from "../../../../pages/manageCases/caseProgression/statementOfService/StatementOfServiceSubmitPage.ts";

interface fl401StatementOfServiceParams {
  page: Page;
  accessibilityTest: boolean;
}

interface c100StatementOfServiceParams {
  page: Page;
  accessibilityTest: boolean;
}

export class StatementOfService {
  public static async FL401statementOfService({
    page,
    accessibilityTest,
  }: fl401StatementOfServiceParams): Promise<void> {
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
  }: c100StatementOfServiceParams): Promise<void> {
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
