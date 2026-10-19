import { expect, Locator, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { DateHelperUtils } from "../../../../../utils/dateHelpers.utils.js";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.js";
import { ConsentToApplicationParams } from "./consentToApplication1.po.js";

// Check your answers for "Do you give your consent?" (c100ResSolConsentingToApplicationA/submit)
export class ConsentToApplicationSubmitPage extends CheckYourAnswersPage {
  private readonly answersTable: Locator = this.page.locator(".form-table");
  private readonly dateUtils: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page, "Do you give your consent?", CommonStaticText.saveAndContinue);
  }

  /** Saves the answers and waits until ExUI has left the event, i.e. the save has finished. */
  async clickSaveAndContinue(): Promise<void> {
    await super.clickSaveAndContinue();
    await expect(this.page).not.toHaveURL(/\/trigger\//, { timeout: 60_000 });
  }

  /** Asserts the page and that each question shows the answer given on the previous page. */
  async assertAnswers(params: ConsentToApplicationParams): Promise<void> {
    await this.assertPageContents();

    const { day, month, year } = params.applicationReceivedDate;
    const answers: [string, string][] = [
      [
        "*Do you consent to the application?",
        params.consentToApplication
          ? CommonStaticText.yes
          : CommonStaticText.no,
      ],
      [
        "*When did you receive the application?",
        this.dateUtils.dayAbbreviatedMonthYear(day, month, year),
      ],
      [
        "*Does the respondent need permission from the court before making applications?",
        params.permissionFromCourtNeeded
          ? CommonStaticText.yes
          : CommonStaticText.no,
      ],
    ];
    if (!params.consentToApplication) {
      answers.push([
        "*Give your reasons for not consenting to the application.",
        params.noConsentReason as string,
      ]);
    }
    if (params.permissionFromCourtNeeded) {
      answers.push([
        "*Provide details of the court order in place.",
        params.courtOrderDetails as string,
      ]);
    }

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
