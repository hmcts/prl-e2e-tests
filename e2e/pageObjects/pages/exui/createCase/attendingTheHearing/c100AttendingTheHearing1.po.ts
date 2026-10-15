import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../../eventPage.po.ts";

export interface C100AttendingTheHearingData {
  whoNeedsWelsh: string;
  interpreter: {
    relationship: string;
    language: string;
    assistance: string;
  };
  adjustments: string;
  specialArrangements: string;
  intermediaryReasons: string;
}

interface FillInFieldsOptions {
  answerYesToAll: boolean;
  attendingTheHearingData: C100AttendingTheHearingData;
}

export class C100AttendingTheHearing1Page extends EventPage {
  private readonly errorSummaryHeading: Locator = this.page.getByRole(
    "heading",
    { name: "There is a problem", exact: true },
  );

  constructor(page: Page) {
    super(page, "Attending the hearing");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();

    const questionLabels = [
      "*Will the applicant, or anyone else attending court, want to speak Welsh or read and write in Welsh during the proceedings?",
      "*Do you know if an interpreter will be needed in the court to explain information in a certain language?",
      "*Does the applicant, or anyone else attending the court, have a disability?",
      "*Will the court need to make special arrangements for the applicant, or any child involved in the case?",
      "*Do you know if an intermediary will be required?",
    ];
    for (const label of questionLabels) {
      await expect(
        this.page.getByRole("group", { name: label, exact: true }),
      ).toBeVisible();
    }

    await expect(
      this.page.getByText(
        "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
        { exact: true },
      ),
    ).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async checkErrorMessages(shouldCheck: boolean): Promise<void> {
    if (!shouldCheck) {
      return;
    }

    await this.clickContinue();
    await expect(this.errorSummaryHeading).toBeVisible();

    const requiredMessages = [
      "*Will the applicant, or anyone else attending court, want to speak Welsh or read and write in Welsh during the proceedings? is required",
      "*Do you know if an interpreter will be needed in the court to explain information in a certain language? is required",
      "*Does the applicant, or anyone else attending the court, have a disability? is required",
      "*Will the court need to make special arrangements for the applicant, or any child involved in the case? is required",
      "*Do you know if an intermediary will be required? is required",
    ];
    for (const message of requiredMessages) {
      await expect(this.page.getByText(message, { exact: true })).toHaveCount(
        2,
      );
    }

    await this.selectMainAnswers(true);
    await this.addWelshNeed();
    await this.addInterpreterNeed();
    await this.addInterpreterNeed();
    await this.clickContinue();

    const conditionalMessages = [
      "*Provide the names of the people involved in the case who want to speak Welsh or read and write in Welsh. is required",
      "*Who will require the interpreter? is required",
      "*Enter details of the language or dialect required. is required",
    ];
    for (const message of conditionalMessages) {
      await expect(this.page.getByText(message, { exact: true })).toHaveCount(
        2,
      );
    }
    await expect(
      this.page.getByText("Field is required", { exact: true }),
    ).toHaveCount(8);

    await this.page.reload();
    await this.assertPageContents();
  }

  async fillInFields({
    answerYesToAll,
    attendingTheHearingData,
  }: FillInFieldsOptions): Promise<void> {
    await this.selectMainAnswers(answerYesToAll);

    if (!answerYesToAll) {
      return;
    }

    await this.addWelshNeed();
    await this.page
      .locator("#welshNeeds_0_whoNeedsWelsh")
      .fill(attendingTheHearingData.whoNeedsWelsh);
    for (const option of ["spoken", "written", "both"]) {
      await this.page
        .locator(`#welshNeeds_0_spokenOrWritten-${option}`)
        .check();
    }

    await this.addInterpreterNeed();
    for (const party of ["applicant", "respondent", "other"]) {
      await this.page.locator(`#interpreterNeeds_0_party-${party}`).check();
    }
    await this.page
      .locator("#interpreterNeeds_0_name")
      .fill(attendingTheHearingData.interpreter.relationship);
    await this.page
      .locator("#interpreterNeeds_0_language")
      .fill(attendingTheHearingData.interpreter.language);
    await this.page
      .locator("#interpreterNeeds_0_otherAssistance")
      .fill(attendingTheHearingData.interpreter.assistance);

    await this.page
      .locator("#adjustmentsRequired")
      .fill(attendingTheHearingData.adjustments);
    await this.page
      .locator("#specialArrangementsRequired")
      .fill(attendingTheHearingData.specialArrangements);
    await this.page
      .locator("#reasonsForIntermediary")
      .fill(attendingTheHearingData.intermediaryReasons);
  }

  private async selectMainAnswers(answerYesToAll: boolean): Promise<void> {
    const answer = answerYesToAll ? "Yes" : "No";
    for (const field of [
      "isWelshNeeded",
      "isInterpreterNeeded",
      "isDisabilityPresent",
      "isSpecialArrangementsRequired",
      "isIntermediaryNeeded",
    ]) {
      const radio = this.page.locator(`#${field}_${answer}`);
      await radio.click();
      await expect(radio).toBeChecked();
    }
  }

  private async addWelshNeed(): Promise<void> {
    await this.page
      .locator("#welshNeeds")
      .getByRole("button", { name: "Add new", exact: true })
      .click();
  }

  private async addInterpreterNeed(): Promise<void> {
    await this.page
      .locator("#interpreterNeeds")
      .getByRole("button", { name: "Add new", exact: true })
      .last()
      .click();
  }
}
