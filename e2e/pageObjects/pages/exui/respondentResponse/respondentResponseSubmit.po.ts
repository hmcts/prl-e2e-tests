import { expect, Locator, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";

/** Check your answers page shared by the respondent solicitor C7 response events. */
export abstract class RespondentResponseSubmitPage extends CheckYourAnswersPage {
  private readonly answersTable: Locator = this.page.locator(".form-table");

  protected constructor(page: Page, headingText: string) {
    super(page, headingText, CommonStaticText.saveAndContinue);
  }

  /** Saves the answers and waits until ExUI has left the event, i.e. the save has finished. */
  async clickSaveAndContinue(): Promise<void> {
    await super.clickSaveAndContinue();
    await expect(this.page).not.toHaveURL(/\/trigger\//, { timeout: 60_000 });
  }

  /** Asserts each [question, answer] pair is shown in its own row of the answers table. */
  protected async assertAnswerRows(answers: [string, string][]): Promise<void> {
    for (const [question, answer] of answers) {
      // one question per inner row of the complex field table
      const row: Locator = this.answersTable
        .locator("tr.complex-panel-simple-field")
        .filter({ hasText: question });
      await expect(row).toHaveCount(1);
      await expect(row).toContainText(answer);
    }
  }
}
