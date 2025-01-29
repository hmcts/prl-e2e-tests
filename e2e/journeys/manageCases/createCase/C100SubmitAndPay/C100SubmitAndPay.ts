import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { SubmitAndPay1Page } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPay1Page";
import { SubmitAndPay2Page } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPay2Page";
import { SubmitAndPay3Page } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPay3Page";
import { SubmitAndPaySubmitPage } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPaySubmitPage";
import { SubmitAndPayConfirmPage } from "../../../../pages/manageCases/createCase/C100/submitAndPay/submitAndPayConfirmPage";

interface C100SubmitAndPayOptions {
  page: Page;
  yesNoHelpWithFees: boolean;
  yesNoWelshLanguage: boolean;
}

export class C100SubmitAndPay {
  public static async c100SubmitAndPay({
    page: page,
    yesNoWelshLanguage: yesNoWelshLanguage,
    yesNoHelpWithFees: yesNoHelpWithFees,
  }: C100SubmitAndPayOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Submit and pay");
    await SubmitAndPay1Page.submitAndPay1Page({
      page,
    });
    await SubmitAndPay2Page.submitAndPay2Page({
      page,
      yesNoWelshLanguage,
    });
    await SubmitAndPay3Page.submitAndPay3Page({
      page,
      yesNoHelpWithFees,
    });
    await SubmitAndPaySubmitPage.submitAndPaySubmitPage({
      page,
      yesNoHelpWithFees,
    });
    await SubmitAndPayConfirmPage.submitAndPayConfirmPage({
      page,
    });
  }
}
