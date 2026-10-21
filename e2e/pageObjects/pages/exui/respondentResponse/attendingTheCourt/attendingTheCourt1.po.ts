import { expect, Locator, Page } from "@playwright/test";
import { RespondentResponseEventPage } from "../respondentResponseEventPage.po.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

export const WelshNeed = {
  speak: "speakWelsh",
  readAndWrite: "readAndWriteWelsh",
} as const;
export type WelshNeedValue = (typeof WelshNeed)[keyof typeof WelshNeed];

export const InterpreterParty = {
  applicant: "applicant",
  respondent: "respondent",
  other: "other",
} as const;
export type InterpreterPartyValue =
  (typeof InterpreterParty)[keyof typeof InterpreterParty];

export interface InterpreterNeed {
  parties: InterpreterPartyValue[];
  relationship: string;
  language: string;
  otherAssistance?: string;
}

/** An answer left out (or empty) is answered "No". */
export interface AttendingTheCourtParams {
  welshNeeds?: WelshNeedValue[];
  interpreterNeed?: InterpreterNeed;
  disabilityAdjustments?: string;
  specialArrangements?: string;
  intermediaryReasons?: string;
}

// Respondent solicitor C7 response - "Attending the court", first page
// (c100ResSolAttendingTheCourtA1).
export class AttendingTheCourt1Page extends RespondentResponseEventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);
  private readonly fieldId = "#respondentAttendingTheCourt";

  private readonly headings: string[] = [
    "Language requirements",
    "Accessibility",
    "Special arrangements",
  ];
  private readonly labels: string[] = [
    "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
    "*Will the respondent or anyone else attending the court want to speak Welsh or read and write in Welsh during the proceedings? (Optional)",
    "*Do you know if an interpreter will be needed in the court to explain information in a certain language? (Optional)",
    "*Does the respondent, or anyone else attending court have a disability? (Optional)",
    "*In some cases, the court can make special arrangements for an adult or child involved in the case. For example - the court may provide a separate waiting room that is set apart from the applicant. Will the court need to make special arrangements for the respondent, or any child involved in the case? (Optional)",
    "*The court can appoint an intermediary for a vulnerable respondent. The intermediary helps the respondent to communicate and give evidence during the case. Do you know if an intermediary will be required? (Optional)",
  ];

  private readonly interpreterNeeds: Locator = this.page.locator(
    `${this.fieldId}_respondentInterpreterNeeds`,
  );
  private readonly disabilityNeeds: Locator = this.page.locator(
    `${this.fieldId}_disabilityNeeds`,
  );
  private readonly specialArrangementDetails: Locator = this.page.locator(
    `${this.fieldId}_respondentSpecialArrangementDetails`,
  );
  private readonly intermediaryNeedDetails: Locator = this.page.locator(
    `${this.fieldId}_respondentIntermediaryNeedDetails`,
  );

  constructor(page: Page) {
    super(page, "Attending the court");
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/c100ResSolAttendingTheCourtA1$/);
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("heading", {
        level: 3,
        name: `Respondent name: ${respondentName}`,
      }),
    ).toBeVisible();
    for (const heading of this.headings) {
      await expect(
        this.page.getByRole("heading", {
          level: 3,
          name: heading,
          exact: true,
        }),
      ).toBeVisible();
    }
    await this.pageUtils.assertStrings(this.labels);
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(params: AttendingTheCourtParams): Promise<void> {
    const welshNeeds: WelshNeedValue[] = params.welshNeeds ?? [];
    await this.answerYesNo("respondentWelshNeeds", welshNeeds.length > 0);
    for (const need of welshNeeds) {
      await this.page
        .locator(`${this.fieldId}_respondentWelshNeedsList-${need}`)
        .check();
    }

    const interpreter: InterpreterNeed | undefined = params.interpreterNeed;
    await this.answerYesNo("isRespondentNeededInterpreter", !!interpreter);
    if (interpreter) {
      await this.interpreterNeeds
        .getByRole("button", { name: "Add new" })
        .first()
        .click();
      const item = `${this.fieldId}_respondentInterpreterNeeds_0`;
      for (const party of interpreter.parties) {
        await this.page.locator(`${item}_party-${party}`).check();
      }
      await this.page
        .locator(`${item}_relationName`)
        .fill(interpreter.relationship);
      await this.page
        .locator(`${item}_requiredLanguage`)
        .fill(interpreter.language);
      await this.page
        .locator(`${item}_respondentOtherAssistance`)
        .fill(interpreter.otherAssistance ?? "");
    }

    await this.answerYesNo("haveAnyDisability", !!params.disabilityAdjustments);
    if (params.disabilityAdjustments) {
      await this.disabilityNeeds.fill(params.disabilityAdjustments);
    }

    await this.answerYesNo(
      "respondentSpecialArrangements",
      !!params.specialArrangements,
    );
    if (params.specialArrangements) {
      await this.specialArrangementDetails.fill(params.specialArrangements);
    }

    await this.answerYesNo(
      "respondentIntermediaryNeeds",
      !!params.intermediaryReasons,
    );
    if (params.intermediaryReasons) {
      await this.intermediaryNeedDetails.fill(params.intermediaryReasons);
    }
  }

  private async answerYesNo(field: string, yes: boolean): Promise<void> {
    await this.page
      .locator(`${this.fieldId}_${field}_${yes ? "Yes" : "No"}`)
      .check();
  }
}
