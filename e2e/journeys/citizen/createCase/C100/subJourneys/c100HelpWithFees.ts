import { Page } from "@playwright/test";
import { NeedHelpWithFeesPage } from "../../../../../pages/citizen/createCase/C100/helpWithFees/needHelpWithFeesPage";
import { FeesAppliedPage } from "../../../../../pages/citizen/createCase/C100/helpWithFees/feesAppliedPage";
import { FeeGuidancePage } from "../../../../../pages/citizen/createCase/C100/helpWithFees/feeGuidancePage";

interface C100HelpWithFeesOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100YesNoNeedHelpWithFees: boolean;
  c100YesNoFeesApplied: boolean
}

export class C100HelpWithFees {
  public static async c100HelpWithFees({
    page,
    accessibilityTest,
    errorMessaging,
    c100YesNoNeedHelpWithFees,
    c100YesNoFeesApplied
  }: C100HelpWithFeesOptions): Promise<void> {
    await NeedHelpWithFeesPage.needHelpWithFeesPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100YesNoNeedHelpWithFees: c100YesNoNeedHelpWithFees
    })
    if  (c100YesNoNeedHelpWithFees) {
      await FeesAppliedPage.feesAppliedPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100YesNoFeesApplied: c100YesNoFeesApplied
      });
      if (!c100YesNoFeesApplied) {
        await FeeGuidancePage.feeGuidancePage({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
        })
      }
    }
  }
}