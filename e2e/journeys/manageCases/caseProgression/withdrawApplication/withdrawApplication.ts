import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { WithdrawApplicationEventConfirmPage } from "../../../../pages/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventConfirmPage.ts";
import { WithdrawApplicationEventSubmitPage } from "../../../../pages/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventSubmitPage.ts";
import { WithdrawApplicationEvent1Page } from "../../../../pages/manageCases/caseProgression/withdrawApplication/withdrawApplicationEvent1Page.ts";
import Config from "../../../../config.ts";
import { SolicitorCACaseCreator } from "../../../../common/solicitorCACaseCreator.ts";
import config from "../../../../config.ts";

interface WithdrawApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  withdrawApplication: boolean;
}

export class WithdrawApplication {
  public static async withdrawApplication({
    page,
    accessibilityTest,
    withdrawApplication,
  }: WithdrawApplicationParams) {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef: string =
      await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );

    await Helpers.chooseEventFromDropdown(page, "Withdraw application");
    await WithdrawApplicationEvent1Page.withdrawApplicationEvent1Page({
      page,
      accessibilityTest,
      withdrawApplication,
    });
    await WithdrawApplicationEventSubmitPage.withdrawApplicationEventSubmitPage(
      {
        page,
        accessibilityTest,
        withdrawApplication,
      },
    );
    await WithdrawApplicationEventConfirmPage.withdrawApplicationEventConfirmPage(
      {
        page,
        accessibilityTest,
        withdrawApplication,
      },
    );
  }
}
