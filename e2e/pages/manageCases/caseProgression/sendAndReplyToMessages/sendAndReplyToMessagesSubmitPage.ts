import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { Helpers } from "../../../../common/helpers";
import { Selectors } from "../../../../common/selectors";
import { SendAndReplyToMessagesSubmitContent } from "../../../../fixtures/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessagesSubmitContent";
import { CommonContent } from "../../../../fixtures/manageCases/commonContent";
import { solicitorCaseCreateType } from "../../../../common/types";

export class SendAndReplyToMessagesSubmitPage {
  public static async sendAndReplyToMessagesSubmitPage(
    page: Page,
    caseType: solicitorCaseCreateType,
    isSend: boolean,
    responseRequired: boolean,
  ) {
    await this.checkPageLoads(page, caseType, isSend, responseRequired);
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    isSend: boolean,
    responseRequired: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.headingH2, {
        hasText: SendAndReplyToMessagesSubmitContent.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SendAndReplyToMessagesSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SendAndReplyToMessagesSubmitContent.checkInfoText16}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
        1,
      ),
    ]);
    if (isSend) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          17,
          SendAndReplyToMessagesSubmitContent,
          "sendMessageText16",
          Selectors.GovukText16,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonContent.judgeNameAndEmail}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${SendAndReplyToMessagesSubmitContent.span}")`,
          1,
        ),
      ]);
      if (caseType === "C100") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${SendAndReplyToMessagesSubmitContent.c100FileText16}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${SendAndReplyToMessagesSubmitContent.fl401FileText16}")`,
          1,
        );
      }
    } else {
      if (responseRequired) {
        await Promise.all([
          Helpers.checkGroup(
            page,
            10,
            SendAndReplyToMessagesSubmitContent,
            "respondYesText16",
            Selectors.GovukText16,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${SendAndReplyToMessagesSubmitContent.respondYesSpan}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:has-text("${SendAndReplyToMessagesSubmitContent.messageSubject}")`,
            1,
          ),
        ]);
      } else {
        await Promise.all([
          Helpers.checkGroup(
            page,
            5,
            SendAndReplyToMessagesSubmitContent,
            "respondNoText16",
            Selectors.GovukText16,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:has-text("${SendAndReplyToMessagesSubmitContent.messageSubject}")`,
            1,
          ),
        ]);
      }
    }
    // TODO Disabled pending ticket FPET:1211
    // if (accessibilityTest) {
    //   await new AxeUtils(page).audit();
    // }
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
