import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { Selectors } from "../../../../common/selectors";
import config from "../../../../utils/config.utils.ts";
import { SendAndReplyToMessagesSubmitContent } from "../../../../fixtures/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessagesSubmitContent";
import { SendAndReplyToMessages1Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages1Page";
import { SendAndReplyToMessages2Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages2Page";
import { SendAndReplyToMessages3Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages3Page";
import { SendAndReplyToMessages4Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages4Page";
import { SendAndReplyToMessages5Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages5Page";
import { SendAndReplyToMessagesConfirmPage } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessagesConfirmPage";
import { SendAndReplyToMessagesSubmitPage } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessagesSubmitPage";
import { solicitorCaseCreateType } from "../../../../common/types.ts";

interface SendAndReplyToMessagesParams {
  page: Page;
  browser: Browser;
  ccdRef: string;
  responseRequired: boolean;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
}

export class SendAndReplyToMessages {
  public static async sendAndReplyToMessages({
    page,
    browser,
    ccdRef,
    responseRequired,
    caseType,
    accessibilityTest,
  }: SendAndReplyToMessagesParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Send and reply to messages");
    await SendAndReplyToMessages1Page.sendAndReplyToMessages1Page(page, true);
    await SendAndReplyToMessages2Page.sendAndReplyToMessages2Page(
      page,
      accessibilityTest,
    );
    await SendAndReplyToMessages3Page.sendAndReplyToMessages3Page(
      page,
      accessibilityTest,
    );
    await SendAndReplyToMessagesSubmitPage.sendAndReplyToMessagesSubmitPage(
      page,
      caseType,
      true,
      responseRequired,
    );
    const judgePage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "judge",
    );
    await Helpers.goToCase(
      judgePage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await Helpers.chooseEventFromDropdown(
      judgePage,
      "Send and reply to messages",
    );
    await SendAndReplyToMessages1Page.sendAndReplyToMessages1Page(
      judgePage,
      false,
    );
    await SendAndReplyToMessages4Page.sendAndReplyToMessages4Page(
      judgePage,
      responseRequired,
      caseType,
    );
    if (responseRequired) {
      await SendAndReplyToMessages5Page.sendAndReplyToAMessage5Page(
        judgePage,
        caseType,
      );
    }
    await SendAndReplyToMessagesSubmitPage.sendAndReplyToMessagesSubmitPage(
      judgePage,
      caseType,
      false,
      responseRequired,
    );
    if (responseRequired) {
      await SendAndReplyToMessagesConfirmPage.sendAndReplyToMessagesConfirmPage(
        judgePage,
      );
    }
    await judgePage
      .locator(Selectors.alertMessage, {
        hasText: SendAndReplyToMessagesSubmitContent.alertMessage,
      })
      .waitFor();
  }
}
