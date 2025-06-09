import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { WithdrawApplicationEventConfirmPage } from "../../../../pages/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventConfirmPage.ts";
import { WithdrawApplicationEventSubmitPage } from "../../../../pages/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventSubmitPage.ts";
import { WithdrawApplicationEvent1Page } from "../../../../pages/manageCases/caseProgression/withdrawApplication/withdrawApplicationEvent1Page.ts";

interface WithdrawApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  withdrawApplication: boolean;
  caseRef: string;
}

export class WithdrawApplication {
  public static async withdrawApplication({
    page,
    accessibilityTest,
    withdrawApplication,
  }: WithdrawApplicationParams) {
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
