import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { DummyC100 } from "../../createCase/dummyCase/dummyC100.ts";
import { WithdrawApplicationEventConfirmPage } from "../../../../pages/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventConfirmPage.ts";
import { WithdrawApplicationEventSubmitPage } from "../../../../pages/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventSubmitPage.ts";
import { WithdrawApplicationEvent1Page } from "../../../../pages/manageCases/caseProgression/withdrawApplication/withdrawApplicationEvent1Page.ts";

interface WithdrawApplicationParams {
  page: Page;
  applicantLivesInRefuge: boolean;
  otherPersonLivesInRefuge: boolean;
  accessibilityTest: boolean;
  withdrawApplication: boolean;
}

export class WithdrawApplication {
  public static async withdrawApplication({
    page,
    accessibilityTest,
    applicantLivesInRefuge,
    otherPersonLivesInRefuge,
    withdrawApplication,
  }: WithdrawApplicationParams) {
    await DummyC100.dummyC100({
      page: page,
      applicantLivesInRefuge,
      otherPersonLivesInRefuge,
    });wa
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
      },
    );
  }
}
