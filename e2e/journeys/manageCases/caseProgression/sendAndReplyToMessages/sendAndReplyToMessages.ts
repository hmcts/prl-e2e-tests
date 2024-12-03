import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { SendAndReplyToMessages1Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages1Page";
import { SendAndReplyToMessages2Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages2Page";
import { SendAndReplyToMessages3Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages3Page";
import { SendAndReplyToMessagesSubmitPage } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessagesSubmitPage";
import { SendAndReplyToMessages4Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages4Page";
import { SendAndReplyToMessages5Page } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages5Page";
import config from "../../../../config";
import { SendAndReplyToMessagesConfirmPage } from "../../../../pages/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessagesConfirmPage";
import { Selectors } from "../../../../common/selectors";
import { SendAndReplyToMessagesSubmitContent } from "../../../../fixtures/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessagesSubmitContent";

interface SendAndReplyToMessagesParams {
  page: Page;
  browser: Browser;
  ccdRef: string;
  responseRequired: boolean;
  accessibilityTest: boolean;
}

export class SendAndReplyToMessages {
  public static async sendAndReplyToMessages({
    page,
    browser,
    ccdRef,
    responseRequired,
    accessibilityTest,
  }: SendAndReplyToMessagesParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Send and reply to messages");
    await SendAndReplyToMessages1Page.sendAndReplyToMessages1Page(
      page,
      true,
      accessibilityTest,
    );
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
      true,
      responseRequired,
      accessibilityTest,
    );
    const judgePage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "judge",
    );
    await Helpers.goToCase(
      judgePage,
      config.manageCasesBaseURL,
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
      accessibilityTest,
    );
    await SendAndReplyToMessages4Page.sendAndReplyToMessages4Page(
      judgePage,
      responseRequired,
      accessibilityTest,
    );
    if (responseRequired) {
      await SendAndReplyToMessages5Page.sendAndReplyToAMessage5Page(
        judgePage,
        accessibilityTest,
      );
    }
    await SendAndReplyToMessagesSubmitPage.sendAndReplyToMessagesSubmitPage(
      judgePage,
      false,
      responseRequired,
      accessibilityTest,
    );
    if (responseRequired) {
      await SendAndReplyToMessagesConfirmPage.sendAndReplyToMessagesConfirmPage(
        judgePage,
        accessibilityTest,
      );
    }
    await judgePage
      .locator(Selectors.alertMessage, {
        hasText: SendAndReplyToMessagesSubmitContent.alertMessage,
      })
      .waitFor();
  }
}