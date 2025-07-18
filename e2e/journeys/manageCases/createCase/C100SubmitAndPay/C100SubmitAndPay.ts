import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { SubmitAndPay1Page } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPay1Page.ts";
import { SubmitAndPay2Page } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPay2Page.ts";
import { SubmitAndPay3Page } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPay3Page.ts";
import { SubmitAndPaySubmitPage } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPaySubmitPage.ts";
import { SubmitAndPayConfirmPage } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPayConfirmPage.ts";

interface C100SubmitAndPayOptions {
  page: Page;
  yesNoHelpWithFees: boolean;
  yesNoWelshLanguage: boolean;
  accessibilityTest: boolean;
}

export class C100SubmitAndPay {
  public static async c100SubmitAndPay({
    page: page,
    yesNoWelshLanguage: yesNoWelshLanguage,
    yesNoHelpWithFees: yesNoHelpWithFees,
    accessibilityTest: accessibilityTest,
  }: C100SubmitAndPayOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Submit and pay");
    await SubmitAndPay1Page.submitAndPay1Page({
      page,
      accessibilityTest,
    });
    await SubmitAndPay2Page.submitAndPay2Page({
      page,
      accessibilityTest,
      yesNoWelshLanguage,
    });
    await SubmitAndPay3Page.submitAndPay3Page({
      page,
      accessibilityTest,
      yesNoHelpWithFees,
    });
    await SubmitAndPaySubmitPage.submitAndPaySubmitPage({
      page,
      accessibilityTest,
      yesNoHelpWithFees,
    });
    await SubmitAndPayConfirmPage.submitAndPayConfirmPage({
      page,
      accessibilityTest,
      yesNoWelshLanguage,
    });
  }
}
