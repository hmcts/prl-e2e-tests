import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { PageUtils } from "../../../../utils/page.utils.js";

export class SendAndReplyToMessages2Page extends EventPage {
  readonly heading3: Locator = this.page.locator(Selectors.h3, {
    hasText: "Sending messages",
  });
  readonly p: Locator = this.page.locator(Selectors.p, {
    hasText:
      "You can send internal messages to HMCTS staff including the judiciary or to external parties.",
  });
  readonly sendingMessagesFormLabels: string[] = [
    "Who are you sending the message to?",
    "Internal message",
    "External message",
    "What is this message about?",
    "An application",
    "A hearing",
    "Review submitted documents",
  ];
  readonly internalMessagesFormLabels: string[] = [
    "Select who to send to",
    "Is this urgent?",
  ];
  readonly judiciaryFormLabels: string[] = [
    "Select a judicial tier or enter a judge's name manually",
    "Enter name of Judge (Optional)",
  ];
  readonly selectLegalAdvisorLabelCorrect: Locator = this.page
    .locator(Selectors.Span)
    .getByText("Select a legal adviser", {
      exact: true,
    });
  readonly otherFormLabel = this.page
    .getByText("Other", { exact: true })
    .first();
  readonly internalMessageRadio: Locator = this.page.locator(
    "#sendMessageObject_internalOrExternalMessage-INTERNAL",
  );
  readonly judiciaryRecipientRadio: Locator = this.page.locator(
    "#sendMessageObject_internalMessageWhoToSendTo-JUDICIARY",
  );
  readonly legalAdvisorRecipientRadio: Locator = this.page.locator(
    "#sendMessageObject_internalMessageWhoToSendTo-LEGAL_ADVISER",
  );
  readonly urgentMessageNoRadio: Locator = this.page.locator(
    "#sendMessageObject_internalMessageUrgent_No",
  );
  readonly reviewSubmittedDocsRadio: Locator = this.page.locator(
    "#sendMessageObject_messageAbout-REVIEW_SUBMITTED_DOCUMENTS",
  );
  readonly judgeTierDropdown: Locator = this.page.locator(
    "#sendMessageObject_judicialOrMagistrateTierList",
  );
  readonly legalAdviserNameTextBox: Locator = this.page.locator(
    "#sendMessageObject_legalAdviser",
  );
  readonly submittedDocumentSelectionDropdown: Locator = this.page.locator(
    "#sendMessageObject_submittedDocumentsList",
  );
  readonly judgeNameInput: Locator = this.page.locator(
    "#sendMessageObject_sendReplyJudgeName",
  );
  readonly messageSubjectInput: Locator = this.page.locator(
    "#sendMessageObject_messageSubject",
  );

  constructor(page: Page) {
    super(page, "Send and reply to messages");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading3).toBeVisible();
    await expect(this.p).toBeVisible();
    await this.pageUtils.assertStrings(this.sendingMessagesFormLabels);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectJudgeOrLegalAdviser(
    isJudge: boolean,
    judgeOrLegalAdviserName: string,
    judgeOrLegalAdviserEmail: string,
  ): Promise<void> {
    await this.internalMessageRadio.check();
    await this.pageUtils.assertStrings(this.internalMessagesFormLabels);
    await expect(this.otherFormLabel).toBeVisible();
    if (isJudge) {
      await this.selectJudge(
        "Circuit Judge",
        judgeOrLegalAdviserName,
        judgeOrLegalAdviserEmail,
      );
    } else {
      await this.selectLegalAdvisor(
        judgeOrLegalAdviserName,
        judgeOrLegalAdviserEmail,
      );
    }
    await this.urgentMessageNoRadio.check();
    await this.reviewSubmittedDocsRadio.check();
    await this.messageSubjectInput.fill("Test Message");
    await this.submittedDocumentSelectionDropdown.selectOption({ index: 1 });
  }

  async selectJudge(
    judgeTier: string,
    judgeName: string,
    judgeEmail: string,
  ): Promise<void> {
    await this.judiciaryRecipientRadio.check();
    await this.pageUtils.assertStrings(this.judiciaryFormLabels);
    await this.judgeTierDropdown.selectOption(judgeTier);
    await this.judgeNameInput.fill(judgeName);
    // Wait for the judge option in the dropdown to become visible using dynamic content
    const judgeNameDropdownOption: Locator = this.page.locator("mat-option", {
      hasText: `${judgeName} (${judgeEmail})`,
    });
    await expect(judgeNameDropdownOption).toBeVisible();
    // Click the option containing the judge name (dynamic value)
    await judgeNameDropdownOption.click();
  }

  async selectLegalAdvisor(
    legalAdvisorName: string,
    legalAdviserEmail: string,
  ): Promise<void> {
    await this.legalAdvisorRecipientRadio.check();
    await expect(this.selectLegalAdvisorLabelCorrect).toBeVisible();
    await this.legalAdviserNameTextBox.fill(legalAdvisorName); // TypeAhead field
    // Wait for the judge option in the dropdown to become visible using dynamic content
    const legalAdviserNameDropdownOption: Locator = this.page.locator(
      "mat-option",
      {
        hasText: `${legalAdvisorName} (${legalAdviserEmail})`,
      },
    );
    await expect(legalAdviserNameDropdownOption).toBeVisible();
    // Click the option containing the judge name (dynamic value)
    await legalAdviserNameDropdownOption.click();
  }
}
