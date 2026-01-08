import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";
import { Selectors } from "../../../../common/selectors.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";

export class SendAndReplyToMessages4Page extends EventPage {
  readonly respondToMessageYesRadio: Locator = this.page.locator(
    "#respondToMessage_Yes",
  );
  readonly respondToMessageNoRadio: Locator = this.page.locator(
    "#respondToMessage_No",
  );
  readonly formHint: Locator = this.page.locator(Selectors.GovukFormHint, {
    hasText:
      "If no response is required, the message will be marked as closed.",
  });
  readonly caseFieldLabel1: Locator = this.page.locator(
    Selectors.GovukTextFieldLabel,
    {
      hasText: "Attached date & time",
    },
  );
  readonly caseFieldLabel2: Locator = this.page.locator(
    Selectors.GovukTextFieldLabel,
    {
      hasText: "Document",
    },
  );
  readonly addButton = this.page
    .getByRole("button", { name: "Add new" })
    .first();
  readonly c100Anchor: Locator = this.page.locator(Selectors.GovLink, {
    hasText: "C100DraftDocument.pdf",
  });
  readonly fl401Anchor: Locator = this.page.locator(Selectors.GovLink, {
    hasText: "DA-Welsh-application.pdf",
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

  readonly noFormLabel = this.page.getByText("No", { exact: true }).first();
  readonly replyingMessagesFormLabels: string[] = [
    "Do you need to respond to this message?",
    "Yes",
    "Court admin",
    "Judiciary",
    "Circuit Judge",
    "Review submitted documents",
    "Test Message",
    "Test message content",
  ];
  readonly documentH4: Locator = this.page.locator(Selectors.headingH4, {
    hasText: "Document",
  });
  readonly replyingMessagesHeadingH4: string[] = [
    "Message",
    "Date and time sent",
    "Sender role",
    "Sender's name",
    "Sender's email",
    "Recipient role",
    "Judicial or magistrate Tier",
    "Judge name",
    "Judge email",
    "Urgency",
    "What is it about",
    "Subject",
    "Message details",
  ];

  constructor(page: Page) {
    super(page, "Send and reply to messages");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);
  readonly dateHelpersUtils: DateHelperUtils = new DateHelperUtils();

  async assertPageContents(
    judgeOrLegalAdviserName: string,
    caseType: string,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.formHint).toBeVisible();
    await this.pageUtils.assertStrings(this.replyingMessagesFormLabels);
    await expect(this.noFormLabel).toBeVisible();
    await this.pageUtils.assertStrings(this.replyingMessagesHeadingH4);
    await expect(this.documentH4).toBeVisible();
    await expect(this.caseFieldLabel1).toBeVisible();
    await expect(this.caseFieldLabel2).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(
      this.page.locator(Selectors.GovukFormLabel, {
        hasText: this.dateHelpersUtils.todayDate().toString(),
      }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.GovukFormLabel, {
        hasText: judgeOrLegalAdviserName,
      }),
    ).toBeVisible();
    if (caseType === "C100") {
      await expect(this.c100FormLabel).toBeVisible();
      await expect(this.c100Anchor).toBeVisible();
    } else {
      await expect(this.fl401FormLabel).toBeVisible();
      await expect(this.fl401Anchor).toBeVisible();
    }
  }

  async respondToMessage(responseRequired: boolean): Promise<void> {
    if (responseRequired) {
      await this.respondToMessageYesRadio.check();
    } else {
      await this.respondToMessageNoRadio.check();
    }
  }
}
