import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../../eventPage.po.ts";

export const hearingUrgencyDetails = {
  urgencyTimeAndReason: "Needs to be heard within 2 days due to risk of harm",
  effortsToNotifyRespondents: "Respondent notified by email and phone",
  withoutNoticeReasons: "Notifying the respondent would put the child at risk",
  reducedNoticeReasons: "The hearing is needed before the usual notice period",
};

const questions: string[] = [
  "*Is this case urgent?",
  "*Do you need a without notice hearing?",
  "*Do you require a hearing with reduced notice?",
  "*Are respondents aware of proceedings?",
];

const conditionalFieldLabels: string[] = [
  "*Set out how soon the case needs to be heard in days and hours, and give the reason for the urgency.",
  "*What efforts have you made to notify each respondent of the application? (Optional)",
  "*Set out the reasons for the application to be considered without notice. This information must be provided - if reasons are not given, the case will not be heard without notice.",
  "*Set out the reasons below",
];

export class C100HearingUrgency1Page extends EventPage {
  private readonly introText: Locator = this.page.getByText(
    "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
    { exact: true },
  );
  private readonly reviewText: Locator = this.page.getByText(
    "The court will review the application and make a decision on the urgency of the application based on the details you provide",
    { exact: true },
  );
  private readonly errorSummaryHeading: Locator = this.page.getByRole(
    "heading",
    { name: /There is a problem/ },
  );
  private readonly caseUrgentYes: Locator =
    this.page.locator("#isCaseUrgent_Yes");
  private readonly caseUrgentNo: Locator =
    this.page.locator("#isCaseUrgent_No");
  private readonly withoutNoticeYes: Locator = this.page.locator(
    "#doYouNeedAWithoutNoticeHearing_Yes",
  );
  private readonly withoutNoticeNo: Locator = this.page.locator(
    "#doYouNeedAWithoutNoticeHearing_No",
  );
  private readonly reducedNoticeYes: Locator = this.page.locator(
    "#doYouRequireAHearingWithReducedNotice_Yes",
  );
  private readonly reducedNoticeNo: Locator = this.page.locator(
    "#doYouRequireAHearingWithReducedNotice_No",
  );
  private readonly respondentsAwareYes: Locator = this.page.locator(
    "#areRespondentsAwareOfProceedings_Yes",
  );
  private readonly respondentsAwareNo: Locator = this.page.locator(
    "#areRespondentsAwareOfProceedings_No",
  );
  private readonly urgencyTimeAndReason: Locator = this.page.locator(
    "#caseUrgencyTimeAndReason",
  );
  private readonly effortsToNotifyRespondents: Locator = this.page.locator(
    "#effortsMadeWithRespondents",
  );
  private readonly withoutNoticeReasons: Locator = this.page.locator(
    "#reasonsForApplicationWithoutNotice",
  );
  private readonly reducedNoticeReasons: Locator = this.page.locator(
    "#setOutReasonsBelow",
  );

  constructor(page: Page) {
    super(page, "Hearing urgency");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.introText).toBeVisible();
    await expect(this.reviewText).toBeVisible();
    for (const question of questions) {
      await expect(
        this.page.getByRole("group", { name: question }),
      ).toBeVisible();
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async checkErrorMessages(shouldCheck: boolean): Promise<void> {
    if (!shouldCheck) {
      return;
    }
    await this.clickContinue();
    await expect(this.errorSummaryHeading).toBeVisible();
    await this.assertErrorMessages(
      questions.map((question) => `${question} is required`),
    );

    // Answering "Yes" reveals the follow-up fields, which are then required.
    await this.selectYesToAll();
    await this.clickContinue();
    await expect(this.errorSummaryHeading).toBeVisible();
    await this.assertErrorMessages([
      `${conditionalFieldLabels[0]} is required`,
      `${conditionalFieldLabels[2]} is required`,
      `${conditionalFieldLabels[3]} is required`,
    ]);
  }

  async fillInFields(answerYesToAll: boolean): Promise<void> {
    if (!answerYesToAll) {
      await this.caseUrgentNo.check();
      await this.withoutNoticeNo.check();
      await this.reducedNoticeNo.check();
      await this.respondentsAwareNo.check();
      return;
    }
    await this.selectYesToAll();
    for (const label of conditionalFieldLabels) {
      await expect(this.page.getByText(label, { exact: true })).toBeVisible();
    }
    await this.urgencyTimeAndReason.fill(
      hearingUrgencyDetails.urgencyTimeAndReason,
    );
    await this.effortsToNotifyRespondents.fill(
      hearingUrgencyDetails.effortsToNotifyRespondents,
    );
    await this.withoutNoticeReasons.fill(
      hearingUrgencyDetails.withoutNoticeReasons,
    );
    await this.reducedNoticeReasons.fill(
      hearingUrgencyDetails.reducedNoticeReasons,
    );
  }

  private async selectYesToAll(): Promise<void> {
    await this.caseUrgentYes.check();
    await this.withoutNoticeYes.check();
    await this.reducedNoticeYes.check();
    await this.respondentsAwareYes.check();
  }

  // Each message appears twice: in the error summary and inline under its field.
  private async assertErrorMessages(messages: string[]): Promise<void> {
    for (const message of messages) {
      await expect(this.page.getByText(message, { exact: true })).toHaveCount(
        2,
      );
    }
  }
}
