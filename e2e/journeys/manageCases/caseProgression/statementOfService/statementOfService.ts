import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { StatementOfService1Page } from "../../../../pages/manageCases/caseProgression/statementOfService/statementOfService1Page";
import { StatementOfServiceSubmitPage } from "../../../../pages/manageCases/caseProgression/statementOfService/StatementOfServiceSubmitPage";

interface statementOfServiceParams {
  page: Page;
  accessibilityTest: boolean;
}

export class StatementOfService {
  public static async statementOfService({
    page,
    accessibilityTest,
  }: statementOfServiceParams): Promise<void> {
    await Helpers.waitForTask(page, "Directions on Issue");
    await Helpers.chooseEventFromDropdown(page, "Service of application");
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
