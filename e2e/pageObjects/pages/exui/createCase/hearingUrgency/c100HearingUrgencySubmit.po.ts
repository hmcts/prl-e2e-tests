import { expect, Locator, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.ts";
import { hearingUrgencyDetails } from "./c100HearingUrgency1.po.ts";

const questions: string[] = [
  "*Is this case urgent?",
  "*Do you need a without notice hearing?",
  "*Do you require a hearing with reduced notice?",
  "*Are respondents aware of proceedings?",
];

const followUpQuestions: string[] = [
  "*Set out how soon the case needs to be heard in days and hours, and give the reason for the urgency.",
  "*What efforts have you made to notify each respondent of the application?",
  "*Set out the reasons for the application to be considered without notice. This information must be provided - if reasons are not given, the case will not be heard without notice.",
  "*Set out the reasons below",
];

export class C100HearingUrgencySubmitPage extends CheckYourAnswersPage {
  private readonly answersTable: Locator = this.page.locator(".form-table");
  private readonly reviewText: Locator = this.page.getByText(
    "The court will review the application and make a decision on the urgency of the application based on the details you provide",
    { exact: true },
  );

  constructor(page: Page) {
    super(page, "Hearing urgency", CommonStaticText.saveAndContinue);
  }

  async assertHearingUrgencyAnswers(
    answerYesToAll: boolean,
    snapshotPath?: string[],
    snapshotName?: string,
  ): Promise<void> {
    if (snapshotPath && snapshotName) {
      await this.assertPageContents(snapshotPath, snapshotName);
    } else {
      await this.assertPageContents();
    }
    await expect(this.reviewText).toBeVisible();

    for (const question of questions) {
      await expect(
        this.answersTable.getByText(question, { exact: true }),
      ).toBeVisible();
    }
    const answer = answerYesToAll ? "Yes" : "No";
    await expect(
      this.answersTable.getByText(answer, { exact: true }),
    ).toHaveCount(questions.length);

    const followUpAnswers: string[] = [
      hearingUrgencyDetails.urgencyTimeAndReason,
      hearingUrgencyDetails.effortsToNotifyRespondents,
      hearingUrgencyDetails.withoutNoticeReasons,
      hearingUrgencyDetails.reducedNoticeReasons,
    ];
    for (const [index, question] of followUpQuestions.entries()) {
      const questionText = this.answersTable.getByText(question, {
        exact: true,
      });
      const answerText = this.answersTable.getByText(followUpAnswers[index], {
        exact: true,
      });
      if (answerYesToAll) {
        await expect(questionText).toBeVisible();
        await expect(answerText).toBeVisible();
      } else {
        await expect(questionText).toHaveCount(0);
        await expect(answerText).toHaveCount(0);
      }
    }
  }
}
