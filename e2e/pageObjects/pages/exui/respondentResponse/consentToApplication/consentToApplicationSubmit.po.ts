import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { DateHelperUtils } from "../../../../../utils/dateHelpers.utils.js";
import { RespondentResponseSubmitPage } from "../respondentResponseSubmit.po.js";
import { ConsentToApplicationParams } from "./consentToApplication1.po.js";

// Check your answers for "Do you give your consent?" (c100ResSolConsentingToApplicationA/submit)
export class ConsentToApplicationSubmitPage extends RespondentResponseSubmitPage {
  private readonly dateUtils: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page, "Do you give your consent?");
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
    await this.assertAnswerRows(answers);
  }
}
