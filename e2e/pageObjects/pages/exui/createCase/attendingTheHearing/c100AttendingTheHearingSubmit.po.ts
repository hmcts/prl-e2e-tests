import { expect, Locator, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.ts";
import { C100AttendingTheHearingData } from "./c100AttendingTheHearing1.po.ts";

export class C100AttendingTheHearingSubmitPage extends CheckYourAnswersPage {
  private readonly answersTable: Locator = this.page.locator(".form-table");

  constructor(page: Page) {
    super(page, "Attending the hearing", CommonStaticText.saveAndContinue);
  }

  async assertAttendingTheHearingAnswers(
    attendingTheHearingData: C100AttendingTheHearingData,
    answerYesToAll: boolean,
    snapshotPath: string[],
    snapshotName: string,
  ): Promise<void> {
    await this.assertPageContents(snapshotPath, snapshotName);

    await expect(
      this.answersTable.getByText(answerYesToAll ? "Yes" : "No", {
        exact: true,
      }),
    ).toHaveCount(5);

    if (!answerYesToAll) {
      return;
    }

    const expectedValues = [
      attendingTheHearingData.whoNeedsWelsh,
      attendingTheHearingData.interpreter.relationship,
      attendingTheHearingData.interpreter.language,
      attendingTheHearingData.interpreter.assistance,
      attendingTheHearingData.adjustments,
      attendingTheHearingData.specialArrangements,
      attendingTheHearingData.intermediaryReasons,
    ];
    for (const value of expectedValues) {
      await expect(
        this.answersTable.getByText(value, { exact: true }),
      ).toBeVisible();
    }
  }
}
