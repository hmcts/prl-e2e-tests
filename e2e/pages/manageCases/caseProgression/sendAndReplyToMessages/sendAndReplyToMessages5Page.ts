import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { Helpers } from "../../../../common/helpers";
import { Selectors } from "../../../../common/selectors";
import { SendAndReplyToMessages5Content } from "../../../../fixtures/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages5Content";
import { CommonContent } from "../../../../fixtures/manageCases/commonContent";
import { solicitorCaseCreateType } from "../../../../common/types";

enum UniqueSelectors {
  courtAdminRecipientRadio = "#replyMessageObject_internalMessageReplyTo-COURT_ADMIN",
  urgentMessageNoRadio = "#replyMessageObject_internalMessageUrgent_No",
  messageContentTextArea = "#replyMessageObject_messageContent",
}

export class SendAndReplyToMessages5Page {
  public static async sendAndReplyToAMessage5Page(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukFormLabel, {
        hasText: SendAndReplyToMessages5Content.formLabel1,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SendAndReplyToMessages5Content.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        SendAndReplyToMessages5Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages5Content.courtAdminLabel}"):visible`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages5Content.legalAdviserLabel}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages5Content.judiciaryLabel}"):visible`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages5Content.formLabelYes}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages5Content.formLabelNo}"):visible`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${SendAndReplyToMessages5Content.strong}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${SendAndReplyToMessages5Content.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages5Content.formLabelReviewSubmittedDocs}"):visible`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        SendAndReplyToMessages5Content,
        "messageTableFormLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonContent.judgeName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonContent.judgeEmail}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        14,
        SendAndReplyToMessages5Content,
        "messageTableHeadingH4",
        Selectors.headingH4,
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
    if (caseType === "C100") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages5Content.c100MessageTableFormLabel}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages5Content.fl401MessageTableFormLabel}")`,
        1,
      );
    }
    // TODO Disabled pending ticket FPET:1211
    // if (accessibilityTest) {
    //   await new AxeUtils(page).audit();
    // }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(UniqueSelectors.courtAdminRecipientRadio);
    await page.check(UniqueSelectors.urgentMessageNoRadio);
    await page.fill(
      UniqueSelectors.messageContentTextArea,
      SendAndReplyToMessages5Content.messageReply,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
