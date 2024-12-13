import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { StatementOfService1Page } from "../../../../pages/manageCases/caseProgression/statementOfService/statementOfService1Page";
import { StatementOfServiceSubmitPage } from "../../../../pages/manageCases/caseProgression/statementOfService/StatementOfServiceSubmitPage";
import {
  WACaseWorkerActions,
} from "../../../../common/types.ts";

interface statementOfServiceParams {
  page: Page;
  accessibilityTest: boolean;
}

export class StatementOfService {
  public static async statementOfService({
    page,
    accessibilityTest,

  }: statementOfServiceParams): Promise<void> {
    const eventToSelect: WACaseWorkerActions = "Statement of service";
    await Helpers.chooseEventFromDropdown(page, eventToSelect);
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
