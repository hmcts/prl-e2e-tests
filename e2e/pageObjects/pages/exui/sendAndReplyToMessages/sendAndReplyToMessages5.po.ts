import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { PageUtils } from "../../../../utils/page.utils.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";

export class SendAndReplyToMessages5Page extends EventPage {
  readonly courtAdminRecipientRadio: Locator = this.page.locator(
    "#replyMessageObject_internalMessageReplyTo-COURT_ADMIN",
  );
  readonly urgentMessageNoRadio: Locator = this.page.locator(
    "#replyMessageObject_internalMessageUrgent_No",
  );
  readonly messageContentTextArea: Locator = this.page.locator(
    "#replyMessageObject_messageContent",
  );

  readonly formHint: Locator = this.page.locator(Selectors.GovukFormHint, {
    hasText:
      "Explain what you're requesting and why. Include answers and decisions you need.",
  });

  readonly circuitJudgeformLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Circuit Judge",
    },
  );

  readonly courtAdminFormLabel = this.page
    .getByText("Court admin", { exact: true })
    .first();
  readonly legalAdvisorFormLabel = this.page
    .getByText("Legal adviser", { exact: true })
    .first();
  readonly judiciaryFormLabel = this.page
    .getByText("Judiciary", { exact: true })
    .first();
  readonly yesFormLabel = this.page.getByText("Yes", { exact: true }).first();
  readonly noFormLabel = this.page.getByText("No", { exact: true }).first();
  readonly reviewSubmittedDocumentsFormLabel = this.page
    .getByText("Review submitted documents", { exact: true })
    .nth(1);
  readonly replyingMessageContentsFormLabels: string[] = [
    "Who are you sending the message to?",
    "Is this urgent?",
    "Enter your message",
    "Test Message",
    "Test message content",
  ];
  readonly emailH4: Locator = this.page.locator(Selectors.headingH4, {
    hasText: "Sender's email",
  });
  readonly whatAboutH4: Locator = this.page.locator(Selectors.headingH4, {
    hasText: "What is it about",
  });
  readonly documentH4: Locator = this.page.locator(Selectors.headingH4, {
    hasText: "Document",
  });
  readonly replyingMessageContentHeadingH4: string[] = [
    "Message",
    "Date and time sent",
    "Sender role",
    "Sender's name",
    "Recipient role",
    "Urgency",
    "Subject",
    "Message details",
  ];
  readonly replyingMessagesHeadingH4ForJudiciary: string[] = [
    "Judicial or magistrate Tier",
    "Judge name",
    "Judge email",
  ];
  readonly replyingMessagesHeadingH4ForLA: string[] = [
    "Legal Adviser name",
    "Legal Adviser email",
  ];

  readonly strong: Locator = this.page.locator(Selectors.strong, {
    hasText: "Your message",
  });
  readonly c100FormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText:
        "Applications -> Applicant documents -> Applicant application -> Draft_C100_application.pdf",
    },
  );
  readonly fl401FormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText:
        "Applications -> Applicant documents -> Applicant application -> FL401FinalDocumentWelsh.pdf",
    },
  );

  constructor(page: Page) {
    super(page, "Send and reply to messages");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);
  readonly dateHelpersUtils: DateHelperUtils = new DateHelperUtils();

  async assertPageContents(
    isJudge: boolean,
    judgeOrLegalAdviserName: string,
    caseType: string,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.formHint).toBeVisible();
    await expect(this.strong).toBeVisible();
    if (isJudge) {
      await this.pageUtils.assertStrings(
        this.replyingMessagesHeadingH4ForJudiciary,
      );
      await expect(this.judiciaryFormLabel).toBeVisible();
      await expect(this.circuitJudgeformLabel).toBeVisible();
      await expect(
        this.page.locator(Selectors.GovukFormLabel, {
          hasText: judgeOrLegalAdviserName,
        }),
      ).toBeVisible();
    } else {
      await this.pageUtils.assertStrings(this.replyingMessagesHeadingH4ForLA);
      await expect(this.legalAdvisorFormLabel).toBeVisible();
      const email = judgeOrLegalAdviserName.match(/\((.*)\)/)?.[1];
      await expect(
        this.page.locator(Selectors.GovukFormLabel, {
          hasText: email,
        }),
      ).toBeVisible();
    }
    await this.pageUtils.assertStrings(this.replyingMessageContentsFormLabels);
    await expect(this.courtAdminFormLabel).toBeVisible();
    await expect(this.yesFormLabel).toBeVisible();
    await expect(this.noFormLabel).toBeVisible();
    await expect(this.reviewSubmittedDocumentsFormLabel).toBeVisible();
    await this.pageUtils.assertStrings(this.replyingMessageContentHeadingH4);
    await expect(this.emailH4).toBeVisible();
    await expect(this.whatAboutH4).toBeVisible();
    await expect(this.documentH4).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(
      this.page.locator(Selectors.GovukFormLabel, {
        hasText: this.dateHelpersUtils.todayDate().toString(),
      }),
    ).toBeVisible();
    if (caseType === "C100") {
      await expect(this.c100FormLabel).toBeVisible();
    } else {
      await expect(this.fl401FormLabel).toBeVisible();
    }
  }

  async replyMessageContent(): Promise<void> {
    await this.courtAdminRecipientRadio.check();
    await this.urgentMessageNoRadio.check();
    await this.messageContentTextArea.fill("Test reply message");
  }
}
