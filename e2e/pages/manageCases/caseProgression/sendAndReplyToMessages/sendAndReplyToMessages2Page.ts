import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { SendAndReplyToMessages2Content } from "../../../../fixtures/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages2Content";
import { CommonContent } from "../../../../fixtures/manageCases/commonContent";

enum UniqueSelectors {
  internalMessageRadio = "#sendMessageObject_internalOrExternalMessage-INTERNAL",
  judiciaryRecipientRadio = "#sendMessageObject_internalMessageWhoToSendTo-JUDICIARY",
  judgeTierDropdown = "#sendMessageObject_judicialOrMagistrateTierList",
  judgeNameInput = "#sendMessageObject_sendReplyJudgeName",
  urgentMessageNoRadio = "#sendMessageObject_internalMessageUrgent_No",
  messageSubjectInput = "#sendMessageObject_messageSubject",
  reviewSubmittedDocsRadio = "#sendMessageObject_messageAbout-REVIEW_SUBMITTED_DOCUMENTS",
  submittedDocumentSelectionDropdown = "#sendMessageObject_submittedDocumentsList",
  judgeNameSelect = ".mat-option-text",
}

export class SendAndReplyToMessages2Page {
  public static async sendAndReplyToMessages2Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.h3, {
        hasText: SendAndReplyToMessages2Content.h3,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SendAndReplyToMessages2Content.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SendAndReplyToMessages2Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        7,
        SendAndReplyToMessages2Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SendAndReplyToMessages2Content.formLabel8}"):visible`,
        1,
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
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(UniqueSelectors.internalMessageRadio);
    await page
      .locator(Selectors.GovukFormLabel, {
        hasText: SendAndReplyToMessages2Content.formLabelSelectWhoToSendTo,
      })
      .waitFor();
    await page
      .locator(Selectors.GovukFormLabel, {
        hasText: SendAndReplyToMessages2Content.formLabelIsThisUrgent,
      })
      .waitFor();
    await page.check(UniqueSelectors.judiciaryRecipientRadio);
    await page.selectOption(
      UniqueSelectors.judgeTierDropdown,
      SendAndReplyToMessages2Content.judgeTier,
    );
    await page.fill(
      UniqueSelectors.judgeNameInput,
      CommonContent.judgeName,
    );
    await page.click(
      `${UniqueSelectors.judgeNameSelect}:text-is("${CommonContent.judgeNameAndEmail}")`,
    );
    await page.check(UniqueSelectors.urgentMessageNoRadio);
    await page.check(UniqueSelectors.reviewSubmittedDocsRadio);
    await page.fill(
      UniqueSelectors.messageSubjectInput,
      SendAndReplyToMessages2Content.messageSubject,
    );
    await page.selectOption(
      UniqueSelectors.submittedDocumentSelectionDropdown,
      { index: 1 },
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
