import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { SendAndReplyToMessages1Content } from "../../../../fixtures/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages1Content.ts";

enum UniqueSelectors {
  sendAMessageRadio = "#chooseSendOrReply-SEND",
  replyToMessageRadio = "#chooseSendOrReply-REPLY",
  messageSelectionDropdown = "#messageReplyDynamicList",
}

export class SendAndReplyToMessages1Page {
  public static async sendAndReplyToMessages1Page(
    page: Page,
    isSend: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page);
    await this.fillInFields(page, isSend);
    await this.continue(page);
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: SendAndReplyToMessages1Content.govUkHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        SendAndReplyToMessages1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    // TODO Disabled pending ticket FPET:1211
    // if (accessibilityTest) {
    //   await new AxeUtils(page).audit();
    // }
  }

  private static async fillInFields(
    page: Page,
    isSend: boolean,
  ): Promise<void> {
    if (isSend) {
      await page.check(UniqueSelectors.sendAMessageRadio);
    } else {
      await page.check(UniqueSelectors.replyToMessageRadio);
      await page.selectOption(UniqueSelectors.messageSelectionDropdown, {
        index: 1,
      });
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
